import { useState } from 'react'

const CATEGORIES = ['BILL', 'TASK', 'DOCUMENT', 'APPOINTMENT', 'SUBSCRIPTION', 'REMINDER', 'OTHER']
const STATUSES = ['PENDING', 'COMPLETED', 'CANCELLED']
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH']

function emptyForm() {
  return {
    title: '',
    description: '',
    category: 'TASK',
    dueDate: '',
    amount: '',
    status: 'PENDING',
    priority: 'MEDIUM',
    recurring: false
  }
}

function ItemForm({ initialItem, onClose, onSubmit, submitting, error }) {
  const [form, setForm] = useState(() =>
    initialItem
      ? {
          title: initialItem.title || '',
          description: initialItem.description || '',
          category: initialItem.category || 'TASK',
          dueDate: initialItem.dueDate || '',
          amount: initialItem.amount != null ? String(initialItem.amount) : '',
          status: initialItem.status || 'PENDING',
          priority: initialItem.priority || 'MEDIUM',
          recurring: Boolean(initialItem.recurring)
        }
      : emptyForm()
  )

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      category: form.category,
      dueDate: form.dueDate || null,
      amount: form.amount === '' ? null : Number(form.amount),
      status: form.status,
      priority: form.priority,
      recurring: form.recurring
    }

    onSubmit(payload)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initialItem ? 'Edit item' : 'New item'}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={2}
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={form.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="dueDate">Due date</label>
              <input
                id="dueDate"
                type="date"
                value={form.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="amount">Amount ($)</label>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={form.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="status">Status</label>
            <select id="status" value={form.status} onChange={(e) => handleChange('status', e.target.value)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="checkbox-row">
            <input
              id="recurring"
              type="checkbox"
              checked={form.recurring}
              onChange={(e) => handleChange('recurring', e.target.checked)}
            />
            <label htmlFor="recurring" style={{ margin: 0 }}>
              This recurs regularly
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="fab" disabled={submitting}>
              {submitting ? 'Saving...' : initialItem ? 'Save changes' : 'Create item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ItemForm
