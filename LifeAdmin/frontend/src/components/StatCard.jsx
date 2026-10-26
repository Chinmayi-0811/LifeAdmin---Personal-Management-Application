function StatCard({ label, value, accent }) {
  const accentClass = accent ? `accent-${accent}` : ''

  return (
    <div className={`stat-card ${accentClass}`}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default StatCard
