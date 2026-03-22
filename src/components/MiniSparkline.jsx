import { LineChart, Line } from 'recharts'
import { Box } from '@mui/material'

export default function MiniSparkline({ data, color = '#2563eb' }) {
  return (
    <Box sx={{ width: 160, height: 54 }}>
      <LineChart width={160} height={54} data={data}>
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
