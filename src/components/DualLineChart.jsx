import './DualLineChart.css'

export default function DualLineChart({ title, data, line1Key, line2Key, line1Label, line2Label, yAxisLabel }) {
  if (!data || data.length === 0) {
    return <div className="chart-container">No data available</div>
  }

  const allValues = data.flatMap(d => [d[line1Key], d[line2Key]])
  const maxValue = Math.max(...allValues)
  const minValue = Math.min(...allValues)
  const range = maxValue - minValue || 1

  const points1 = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - ((d[line1Key] - minValue) / range) * 100
    return { x, y, value: d[line1Key], label: d.month }
  })

  const points2 = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - ((d[line2Key] - minValue) / range) * 100
    return { x, y, value: d[line2Key], label: d.month }
  })

  const pathD1 = points1.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const pathD2 = points2.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <div className="dual-line-chart-container">
      <h2>{title}</h2>
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
          <span>{line1Label}</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
          <span>{line2Label}</span>
        </div>
      </div>
      <div className="chart-wrapper-dual">
        <div className="y-axis-label">{yAxisLabel}</div>
        <svg viewBox="0 0 100 100" className="dual-line-chart" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={pathD1} stroke="#3b82f6" strokeWidth="0.6" fill="none" />
          <path
            d={`${pathD1} L 100 100 L 0 100 Z`}
            fill="url(#lineGradient1)"
          />

          <path d={pathD2} stroke="#10b981" strokeWidth="0.6" fill="none" />
          <path
            d={`${pathD2} L 100 100 L 0 100 Z`}
            fill="url(#lineGradient2)"
          />

          {points1.map((p, i) => (
            <circle key={`line1-${i}`} cx={p.x} cy={p.y} r="0.7" fill="#3b82f6" />
          ))}
          {points2.map((p, i) => (
            <circle key={`line2-${i}`} cx={p.x} cy={p.y} r="0.7" fill="#10b981" />
          ))}
        </svg>
        <div className="chart-labels">
          <div className="x-labels">
            {points1.map((p, i) => (
              i % Math.ceil(points1.length / 6) === 0 && (
                <span key={i} style={{ left: `${p.x}%` }}>
                  {p.label}
                </span>
              )
            ))}
          </div>
          <div className="y-axis-ticks">
            {[0, 25, 50, 75, 100].map((tick) => (
              <div key={tick} className="y-tick" style={{ bottom: `${tick}%` }}>
                <span>{Math.round(minValue + (range * tick) / 100)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
