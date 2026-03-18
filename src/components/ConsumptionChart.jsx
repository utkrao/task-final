import { Box, Stack, Typography } from '@mui/material'
import {
  Area,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function pickSplitKey(data, historicalCount = 6) {
  const idx = Math.max(0, Math.min(historicalCount - 1, (data?.length || 0) - 1))
  return data?.[idx]?.quarterShort
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const items = payload
    .filter((p) => p.value != null)
    .map((p) => ({ name: p.name, value: p.value, color: p.color }))

  return (
    <Box
      sx={{
        px: 1.25,
        py: 1,
        bgcolor: 'rgba(17,24,39,0.94)',
        color: 'white',
        borderRadius: 2,
        minWidth: 180,
      }}
    >
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
        {label}
      </Typography>
      <Stack spacing={0.5} sx={{ mt: 0.75 }}>
        {items.map((it) => (
          <Stack key={it.name} direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width: 10, height: 10, borderRadius: 99, bgcolor: it.color }} />
              <Typography variant="caption" sx={{ color: 'inherit' }}>
                {it.name}
              </Typography>
            </Stack>
            <Typography variant="caption" fontWeight={800} sx={{ color: 'inherit' }}>
              {it.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}

export default function ConsumptionChart({
  data,
  showActual,
  showForecast,
  showBaseline,
  showAIForecast = true,
  showConfidence = false,
}) {
  const splitKey = pickSplitKey(data, 6)

  return (
    <Box sx={{ height: '100%', minHeight: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 24, right: 18, bottom: 12, left: 4 }}>
          <CartesianGrid strokeDasharray="3 6" stroke="rgba(148, 163, 184, 0.18)" />
          <XAxis dataKey="quarterShort" tickMargin={10} stroke="rgba(148, 163, 184, 0.55)" />
          <YAxis tickMargin={10} width={56} stroke="rgba(148, 163, 184, 0.55)" />
          <Tooltip content={<ChartTooltip />} />

          {splitKey ? (
            <ReferenceLine
              x={splitKey}
              stroke="rgba(148, 163, 184, 0.35)"
              strokeDasharray="4 6"
              label={{
                value: 'HISTORICAL      FORECAST',
                position: 'insideTop',
                fill: 'rgba(226, 232, 240, 0.75)',
                fontSize: 11,
                fontWeight: 900,
              }}
            />
          ) : null}

          {showConfidence ? (
            <Area
              name="Confidence interval"
              type="monotone"
              dataKey="ciHigh"
              stroke="transparent"
              fill="rgba(45, 212, 191, 0.12)"
              activeDot={false}
              dot={false}
              connectNulls={false}
              baseLine={(d) => d.ciLow}
            />
          ) : null}

          {showActual ? (
            <Line
              name="Consumption"
              type="monotone"
              dataKey="consumption"
              stroke="#facc15"
              strokeWidth={2.5}
              dot={false}
              connectNulls={false}
              activeDot={{ r: 5 }}
            />
          ) : null}

          {showAIForecast ? (
            <Line
              name="AI Forecast"
              type="monotone"
              dataKey="aiForecast"
              stroke="#22c55e"
              strokeWidth={2.2}
              dot={false}
              opacity={0.95}
              strokeDasharray="2 6"
              connectNulls={false}
              activeDot={{ r: 5 }}
            />
          ) : null}

          {showForecast ? (
            <Line
              name="Final Forecast"
              type="monotone"
              dataKey="finalForecast"
              stroke="#a78bfa"
              strokeWidth={2.5}
              dot={false}
              strokeDasharray="6 4"
              connectNulls={false}
              activeDot={{ r: 5 }}
            />
          ) : null}

          {showBaseline ? (
            <Line
              name="Previous Quarter Final Forecast"
              type="monotone"
              dataKey="previousQuarterFinalForecast"
              stroke="#e5e7eb"
              strokeWidth={1.8}
              dot={false}
              opacity={0.5}
              strokeDasharray="2 6"
              connectNulls
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}

