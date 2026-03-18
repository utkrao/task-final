import { LineChart, Line, Tooltip } from 'recharts'
import { Box, Typography } from '@mui/material'

function SparkTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const v = payload[0]?.value
  return (
    <Box
      sx={{
        px: 1,
        py: 0.5,
        bgcolor: 'rgba(17,24,39,0.92)',
        color: 'white',
        borderRadius: 1,
      }}
    >
      <Typography variant="caption" sx={{ color: 'inherit' }}>
        {v}
      </Typography>
    </Box>
  )
}

export default function MiniSparkline({ data, color = '#2563eb' }) {
  return (
    <Box sx={{ width: 160, height: 54 }}>
      <LineChart width={160} height={54} data={data}>
        <Tooltip content={<SparkTooltip />} cursor={false} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </Box>
  )
}

