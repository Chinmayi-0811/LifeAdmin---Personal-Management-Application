function formatDate(dateStr) {
  if (!dateStr) return null
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function ItemCard({ item, onEdit, onDelete, onToggleComplete }) {
  const isCompleted = item.status === 'COMPLETED'

  return (
    <div className={`item-card ${isCompleted ? 'status-completed' : ''}`}>
      <div className="item-card-top">
        <div>
          <p className="item-title">{item.title}</p>
          {item.description && <p className="item-description">{item.description}</p>}
        </div>
        <span className={`pill priority-${item.priority}`}>{item.priority}</span>
      </div>

      <div className="item-meta">
        <span className="pill">{item.category}</span>
        <span>{item.status}</span>
        {item.dueDate && <span>Due {formatDate(item.dueDate)}</span>}
        {item.amount != null && <span>${Number(item.amount).toFixed(2)}</span>}
        {item.recurring && <span>Recurring</span>}
      </div>

      <div className="item-actions">
        {!isCompleted && (
          <button className="link-btn" onClick={() => onToggleComplete(item)}>
            Mark complete
          </button>
        )}
        <button className="link-btn" onClick={() => onEdit(item)}>
          Edit
        </button>
        <button className="link-btn" style={{ color: '#b14b4b' }} onClick={() => onDelete(item)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default ItemCard
