import React from 'react'
import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import MiniSparkline from './MiniSparkline.jsx'

function TrendIcon({ trend }) {
  if (trend === 'down') return <ArrowDownwardIcon sx={{ color: '#fb7185', fontSize: 20 }} />
  return <ArrowUpwardIcon sx={{ color: '#34d399', fontSize: 20 }} />
}

export default React.memo(function CityWidget({ city, onClick }) {
  const row1 = city.widgets?.forecastValue
  const row2 = city.widgets?.forecastPct

  return (
    <Card
      variant="outlined"
      sx={{
        width: 300,
        borderRadius: 2,
        overflow: 'hidden',
        borderColor: 'rgba(45, 212, 191, 0.35)',
        bgcolor: 'rgba(2, 6, 23, 0.50)',
        boxShadow: '0 0 0 1px rgba(45,212,191,0.12) inset',
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          p: 2,
          '&:hover': { bgcolor: 'rgba(45, 212, 191, 0.04)' },
        }}
      >
        <Typography variant="subtitle2" fontWeight={900} sx={{ mb: 1 }}>
          {city.displayName}
        </Typography>

        <Stack spacing={1.5}>
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              {row1?.label || 'Forecast'}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
              <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: -0.5 }}>
                {row1?.valueText || '—'}
              </Typography>
              <Stack direction="row" spacing={0.75} alignItems="center">
                <MiniSparkline data={row1?.sparkline || []} color="#60a5fa" />
                <TrendIcon trend={row1?.trend} />
              </Stack>
            </Stack>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              {row2?.label || 'Forecast'}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
              <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: -0.5 }}>
                {row2?.valueText || '—'}
              </Typography>
              <Stack direction="row" spacing={0.75} alignItems="center">
                <MiniSparkline data={row2?.sparkline || []} color="#93c5fd" />
                <TrendIcon trend={row2?.trend} />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </CardActionArea>
    </Card>
  )
})
