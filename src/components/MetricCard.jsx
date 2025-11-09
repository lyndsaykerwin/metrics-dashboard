import './MetricCard.css'

export default function MetricCard({ title, value, change, icon }) {
  const isPositive = change >= 0

  return (
    <div className="metric-card">
      <div className="metric-card-header">
        <h3>{title}</h3>
        {icon && <span className="metric-icon">{icon}</span>}
      </div>
      <div className="metric-value">{value}</div>
      <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
        <span>{isPositive ? '↑' : '↓'}</span>
        <span>{Math.abs(change)}% from last month</span>
      </div>
    </div>
  )
}
