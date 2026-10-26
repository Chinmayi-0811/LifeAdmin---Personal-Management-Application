function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        Life<span>Admin</span>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-nav-item active">Dashboard</div>
      </nav>
      <div className="sidebar-footer">
        <span style={{ fontSize: '0.75rem', color: '#9aa39c' }}>
          Bills, tasks & reminders — all in one place.
        </span>
      </div>
    </aside>
  )
}

export default Sidebar
