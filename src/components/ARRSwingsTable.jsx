import './ARRSwingsTable.css'

export default function ARRSwingsTable({ data }) {
  if (!data || data.length === 0) {
    return <div className="table-container">No data available</div>
  }

  return (
    <div className="arr-swings-table-container">
      <h2>ARR Swings</h2>
      <div className="table-wrapper">
        <table className="arr-swings-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Previous ARR</th>
              <th>Current ARR</th>
              <th>Change</th>
              <th>Change %</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const change = row.currentARR - row.previousARR
              const changePercent = ((change / row.previousARR) * 100).toFixed(1)
              const isPositive = change >= 0

              return (
                <tr key={i}>
                  <td className="customer-name">{row.customer}</td>
                  <td className="arr-value">${row.previousARR.toLocaleString()}</td>
                  <td className="arr-value">${row.currentARR.toLocaleString()}</td>
                  <td className={`change-value ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '+' : ''}{change.toLocaleString()}
                  </td>
                  <td className={`change-percent ${isPositive ? 'positive' : 'negative'}`}>
                    <span>{isPositive ? '↑' : '↓'}</span>
                    <span>{Math.abs(changePercent)}%</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
