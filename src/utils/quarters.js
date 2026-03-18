function pad2(n) {
  return String(n).padStart(2, '0')
}

export function getQuarterIndex(date = new Date()) {
  const month = date.getMonth() // 0-11
  return Math.floor(month / 3) + 1 // 1-4
}

export function formatQuarterLabel({ year, quarter }) {
  return `${year} Q${quarter}`
}

export function addQuarters({ year, quarter }, delta) {
  let q = quarter + delta
  let y = year
  while (q > 4) {
    q -= 4
    y += 1
  }
  while (q < 1) {
    q += 4
    y -= 1
  }
  return { year: y, quarter: q }
}

export function getCurrentQuarter() {
  const now = new Date()
  return { year: now.getFullYear(), quarter: getQuarterIndex(now) }
}

export function getQuarterRange({ historicalCount, forecastCount }) {
  const current = getCurrentQuarter()
  const start = addQuarters(current, -(historicalCount - 1))
  const total = historicalCount + forecastCount

  const quarters = []
  for (let i = 0; i < total; i += 1) {
    const q = addQuarters(start, i)
    quarters.push({
      ...q,
      key: `${q.year}-Q${q.quarter}`,
      label: formatQuarterLabel(q),
      shortLabel: `Q${q.quarter} '${pad2(q.year % 100)}`,
    })
  }
  return { current, quarters }
}

