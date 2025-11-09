export function calculateYoYARRGrowth(currentARR, previousYearARR) {
  if (!previousYearARR || previousYearARR === 0) return 0
  return ((currentARR - previousYearARR) / previousYearARR) * 100
}

export function calculateLTMGrossDollarRetention(monthlyData) {
  if (!monthlyData || monthlyData.length < 2) return 100

  let totalRetained = 0
  let totalStartingArr = 0

  for (let i = 0; i < monthlyData.length - 1; i++) {
    const startingARR = monthlyData[i].value
    const retainedARR = monthlyData[i + 1].value

    totalStartingArr += startingARR
    totalRetained += Math.min(retainedARR, startingARR)
  }

  return totalStartingArr > 0 ? (totalRetained / totalStartingArr) * 100 : 100
}

export function calculateLTMNetDollarRetention(monthlyData, expansionData = []) {
  if (!monthlyData || monthlyData.length < 2) return 100

  let totalRetained = 0
  let totalStartingArr = 0

  for (let i = 0; i < monthlyData.length - 1; i++) {
    const startingARR = monthlyData[i].value
    const retainedARR = monthlyData[i + 1].value
    const expansion = expansionData[i] || 0

    totalStartingArr += startingARR
    totalRetained += retainedARR + expansion
  }

  return totalStartingArr > 0 ? (totalRetained / totalStartingArr) * 100 : 100
}

export function getMonthlyRetentionTrend(monthlyData, lookbackMonths = 12) {
  if (!monthlyData || monthlyData.length < 2) return []

  const data = monthlyData.slice(-lookbackMonths)
  const trend = []

  for (let i = 0; i < data.length - 1; i++) {
    const startingARR = data[i].value
    const retainedARR = data[i + 1].value

    const grossRetention = startingARR > 0 ? (retainedARR / startingARR) * 100 : 100
    const netRetention = startingARR > 0 ? (retainedARR / startingARR) * 100 : 100

    trend.push({
      month: data[i].month,
      grossRetention: Math.round(grossRetention * 10) / 10,
      netRetention: Math.round(netRetention * 10) / 10
    })
  }

  return trend
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

export function formatPercent(value) {
  return `${Math.round(value * 10) / 10}%`
}
