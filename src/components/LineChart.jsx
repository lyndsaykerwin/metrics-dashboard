import './LineChart.css'

export default function LineChart({ title, data, dataKey, xKey }) {
  if (!data || data.length === 0) {
    return <div className="chart-container">No data available</div>
  }

  const maxValue = Math.max(...data.map(d => d[dataKey]))
  const minValue = Math.min(...data.map(d => d[dataKey]))
  const range = maxValue - minValue || 1

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - ((d[dataKey] - minValue) / range) * 100
    return { x, y, value: d[dataKey], label: d[xKey] }
  })

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <div className="line-chart-container">
      <h2>{title}</h2>
      <div className="chart-wrapper">
        <svg viewBox="0 0 100 100" className="line-chart" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={pathD} stroke="#3b82f6" strokeWidth="0.5" fill="none" />
          <path
            d={`${pathD} L 100 100 L 0 100 Z`}
            fill="url(#lineGradient)"
          />
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="0.8" fill="#3b82f6" />
          ))}
        </svg>
        <div className="chart-labels">
          <div className="x-labels">
            {points.map((p, i) => (
              i % Math.ceil(points.length / 5) === 0 && (
                <span key={i} style={{ left: `${p.x}%` }}>
                  {p.label}
                </span>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
