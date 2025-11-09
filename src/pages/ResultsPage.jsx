import { useState } from 'react'
import MetricCard from '../components/MetricCard'
import DualLineChart from '../components/DualLineChart'
import BarChart from '../components/BarChart'
import ARRSwingsTable from '../components/ARRSwingsTable'
import { calculateYoYARRGrowth, calculateLTMGrossDollarRetention, calculateLTMNetDollarRetention, getMonthlyRetentionTrend, formatCurrency, formatPercent } from '../utils/calculations'
import './ResultsPage.css'

export default function ResultsPage() {
  const [timeRange] = useState('month')

  const monthlyARRData = [
    { month: 'Nov 23', value: 800000 },
    { month: 'Dec 23', value: 850000 },
    { month: 'Jan 24', value: 920000 },
    { month: 'Feb 24', value: 880000 },
    { month: 'Mar 24', value: 1050000 },
    { month: 'Apr 24', value: 980000 },
    { month: 'May 24', value: 1100000 },
    { month: 'Jun 24', value: 1200000 },
    { month: 'Jul 24', value: 1180000 },
    { month: 'Aug 24', value: 1250000 },
    { month: 'Sep 24', value: 1320000 },
    { month: 'Oct 24', value: 1400000 },
  ]

  const previousYearARR = 950000
  const currentARR = 1400000
  const yoyGrowth = calculateYoYARRGrowth(currentARR, previousYearARR)
  const ltmGrossDollarRetention = calculateLTMGrossDollarRetention(monthlyARRData)
  const ltmNetDollarRetention = calculateLTMNetDollarRetention(monthlyARRData)

  const metrics = [
    { title: 'Total ARR', value: formatCurrency(currentARR), change: yoyGrowth },
    { title: 'YoY ARR Growth', value: formatPercent(yoyGrowth), change: yoyGrowth },
    { title: 'LTM Gross Dollar Retention', value: formatPercent(ltmGrossDollarRetention), change: ltmGrossDollarRetention - 100 },
    { title: 'LTM Net Dollar Retention', value: formatPercent(ltmNetDollarRetention), change: ltmNetDollarRetention - 100 },
  ]

  const retentionTrend = getMonthlyRetentionTrend(monthlyARRData)

  const arrSwings = [
    { customer: 'Acme Corp', previousARR: 120000, currentARR: 145000 },
    { customer: 'TechStart Inc', previousARR: 85000, currentARR: 92000 },
    { customer: 'Global Systems', previousARR: 210000, currentARR: 205000 },
    { customer: 'StartupXYZ', previousARR: 45000, currentARR: 68000 },
    { customer: 'Enterprise Plus', previousARR: 300000, currentARR: 320000 },
  ]

  return (
    <div className="results-page">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>SaaS Metrics Dashboard</h1>
          <p>Real-time revenue and customer insights</p>
        </div>
        <select className="time-range-select" value={timeRange}>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </header>

      <div className="metrics-grid">
        {metrics.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <DualLineChart
            title="LTM Retention Metrics (Rolling 12-Month)"
            data={retentionTrend}
            line1Key="grossRetention"
            line2Key="netRetention"
            line1Label="Gross Dollar Retention"
            line2Label="Net Dollar Retention"
            yAxisLabel="Retention %"
          />
        </div>
        <div className="chart-card">
          <BarChart
            title="Monthly ARR (Last 12 Months)"
            data={monthlyARRData}
            dataKey="value"
            xKey="month"
            yAxisLabel="ARR"
          />
        </div>
      </div>

      <div className="table-card">
        <ARRSwingsTable data={arrSwings} />
      </div>
    </div>
  )
}
