import './BarChart.css'

export default function BarChart({ title, data, dataKey, xKey, yAxisLabel }) {
  if (!data || data.length === 0) {
    return <div className="chart-container">No data available</div>
  }

  const maxValue = Math.max(...data.map(d => d[dataKey]))

  return (
    <div className="bar-chart-container">
      <h2>{title}</h2>
      {yAxisLabel && <div className="bar-y-axis-label">{yAxisLabel}</div>}
      <div className="bar-chart">
        {data.map((d, i) => (
          <div key={i} className="bar-item">
            <div className="bar-wrapper">
              <div
                className="bar"
                style={{ height: `${(d[dataKey] / maxValue) * 100}%` }}
              />
            </div>
            <div className="bar-label">{d[xKey]}</div>
            <div className="bar-value">{d[dataKey]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
