import { useCallback, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import StatCard from '../components/StatCard.jsx'
import ItemCard from '../components/ItemCard.jsx'
import ItemForm from '../components/ItemForm.jsx'
import { fetchDashboard, fetchItems, createItem, updateItem, deleteItem } from '../api/api.js'

const CATEGORY_OPTIONS = ['BILL', 'TASK', 'DOCUMENT', 'APPOINTMENT', 'SUBSCRIPTION', 'REMINDER', 'OTHER']
const STATUS_OPTIONS = ['PENDING', 'COMPLETED', 'CANCELLED']
const PRIORITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH']

function Dashboard() {
  const storedUser = JSON.parse(localStorage.getItem('lifeadmin_user') || 'null')

  const [stats, setStats] = useState(null)
  const [items, setItems] = useState([])
  const [loadingItems, setLoadingItems] = useState(true)
  const [listError, setListError] = useState('')

  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const loadDashboard = useCallback(async () => {
    try {
      const response = await fetchDashboard()
      setStats(response.data)
    } catch (err) {
      // Non-fatal: stats are supplementary, the item list is the source of truth.
      console.error('Failed to load dashboard stats', err)
    }
  }, [])

  const loadItems = useCallback(async () => {
    setLoadingItems(true)
    setListError('')
    try {
      const params = {}
      if (keyword.trim()) params.keyword = keyword.trim()
      if (category) params.category = category
      if (status) params.status = status
      if (priority) params.priority = priority

      const response = await fetchItems(params)
      setItems(response.data)
    } catch (err) {
      setListError('Could not load your items. Please try again.')
    } finally {
      setLoadingItems(false)
    }
  }, [keyword, category, status, priority])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadItems()
    }, 250) // small debounce for the keyword search

    return () => clearTimeout(timeout)
  }, [loadItems])

  function openCreateForm() {
    setEditingItem(null)
    setFormError('')
    setShowForm(true)
  }

  function openEditForm(item) {
    setEditingItem(item)
    setFormError('')
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingItem(null)
    setFormError('')
  }

  async function handleFormSubmit(payload) {
    setSubmitting(true)
    setFormError('')

    try {
      if (editingItem) {
        await updateItem(editingItem.id, payload)
      } else {
        await createItem(payload)
      }
      closeForm()
      await Promise.all([loadItems(), loadDashboard()])
    } catch (err) {
      const message = err.response?.data?.message || 'Could not save this item. Please check the form and try again.'
      setFormError(message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(item) {
    const confirmed = window.confirm(`Delete "${item.title}"? This cannot be undone.`)
    if (!confirmed) return

    try {
      await deleteItem(item.id)
      await Promise.all([loadItems(), loadDashboard()])
    } catch (err) {
      alert('Could not delete this item. Please try again.')
    }
  }

  async function handleToggleComplete(item) {
    try {
      await updateItem(item.id, {
        title: item.title,
        description: item.description,
        category: item.category,
        dueDate: item.dueDate,
        amount: item.amount,
        status: 'COMPLETED',
        priority: item.priority,
        recurring: item.recurring
      })
      await Promise.all([loadItems(), loadDashboard()])
    } catch (err) {
      alert('Could not update this item. Please try again.')
    }
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-area">
        <Navbar userName={storedUser?.name} />

        <div className="content">
          <div className="stat-grid">
            <StatCard label="Total items" value={stats ? stats.totalItems : '—'} />
            <StatCard label="Pending" value={stats ? stats.pendingItems : '—'} accent="amber" />
            <StatCard label="Completed" value={stats ? stats.completedItems : '—'} accent="slate" />
            <StatCard label="Due within 7 days" value={stats ? stats.upcomingItems : '—'} accent="brick" />
          </div>

          <div className="section-heading">
            <h2>Your items</h2>
            <button className="fab" onClick={openCreateForm}>
              + New item
            </button>
          </div>

          <div className="toolbar">
            <input
              type="text"
              placeholder="Search by title or description..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All categories</option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="">All priorities</option>
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {listError && <div className="form-error">{listError}</div>}

          {loadingItems ? (
            <p style={{ color: 'var(--ink-soft)' }}>Loading your items...</p>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <p>No items match your filters yet.</p>
              <p>Create your first item to get started.</p>
            </div>
          ) : (
            <div className="item-grid">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <ItemForm
          initialItem={editingItem}
          onClose={closeForm}
          onSubmit={handleFormSubmit}
          submitting={submitting}
          error={formError}
        />
      )}
    </div>
  )
}

export default Dashboard
