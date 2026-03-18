import { useMemo, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import ConsumptionChart from './ConsumptionChart.jsx'
import QuarterTable from './QuarterTable.jsx'

export default function ConsumptionPanel({ city, dataset }) {
  const [showConsumption, setShowConsumption] = useState(true)
  const [showAIForecast, setShowAIForecast] = useState(true)
  const [showFinalForecast, setShowFinalForecast] = useState(true)
  const [showPrevQuarter, setShowPrevQuarter] = useState(false)
  const [showConfidence, setShowConfidence] = useState(false)

  const chartData = useMemo(() => dataset.quarters, [dataset.quarters])

  return (
    <Stack spacing={1.5} sx={{ height: '100%', minHeight: 0 }}>
      <Card
        variant="outlined"
        sx={{
          borderColor: 'rgba(148, 163, 184, 0.18)',
          bgcolor: 'rgba(2, 6, 23, 0.35)',
        }}
      >
        <CardContent sx={{ py: 1.5 }}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle1" fontWeight={900} noWrap>
                  {dataset.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {dataset.subtitle} • {city.displayName}
                </Typography>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                <FormControlLabel
                  control={
                    <Switch checked={showConsumption} onChange={(e) => setShowConsumption(e.target.checked)} />
                  }
                  label={<Typography variant="caption">Consumption</Typography>}
                />
                <FormControlLabel
                  control={
                    <Switch checked={showAIForecast} onChange={(e) => setShowAIForecast(e.target.checked)} />
                  }
                  label={<Typography variant="caption">AI Forecast</Typography>}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={showFinalForecast}
                      onChange={(e) => setShowFinalForecast(e.target.checked)}
                    />
                  }
                  label={<Typography variant="caption">Final Forecast</Typography>}
                />
                <FormControlLabel
                  control={
                    <Switch checked={showPrevQuarter} onChange={(e) => setShowPrevQuarter(e.target.checked)} />
                  }
                  label={<Typography variant="caption">Prev Q Final</Typography>}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={showConfidence}
                      onChange={(e) => setShowConfidence(e.target.checked)}
                    />
                  }
                  label={<Typography variant="caption">Confidence</Typography>}
                />
              </Stack>
            </Stack>
            <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.14)' }} />
            <Typography variant="caption" color="text.secondary">
              Historical vs Forecast split is based on the current quarter. Hover to see quarter details.
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Card
        variant="outlined"
        sx={{
          flex: 1,
          minHeight: 0,
          borderColor: 'rgba(148, 163, 184, 0.18)',
          bgcolor: 'rgba(2, 6, 23, 0.28)',
        }}
      >
        <CardContent sx={{ height: '100%' }}>
          <ConsumptionChart
            data={chartData}
            showActual={showConsumption}
            showAIForecast={showAIForecast}
            showForecast={showFinalForecast}
            showBaseline={showPrevQuarter}
            showConfidence={showConfidence}
          />
        </CardContent>
      </Card>

      <Card
        variant="outlined"
        sx={{
          borderColor: 'rgba(148, 163, 184, 0.18)',
          bgcolor: 'rgba(2, 6, 23, 0.22)',
        }}
      >
        <CardContent sx={{ py: 1.25 }}>
          <QuarterTable data={chartData} />
        </CardContent>
      </Card>
    </Stack>
  )
}

