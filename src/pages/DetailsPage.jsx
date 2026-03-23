import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  AppBar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded'
import MenuRounded from '@mui/icons-material/MenuRounded'
import MenuOpenRounded from '@mui/icons-material/MenuOpenRounded'
import { useDashboard } from '../contexts/DashboardContext.jsx'
import DetailsSidebar from '../components/DetailsSidebar.jsx'
import ConsumptionPanel from '../components/ConsumptionPanel.jsx'

export default function DetailsPage() {
  const navigate = useNavigate()
  const { cityId } = useParams()

  const { cities } = useDashboard()
  const city = useMemo(() => cities.find((c) => c.cityId === cityId) || null, [cities, cityId])
  const datasets = city?.cards || []
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedDatasetId, setSelectedDatasetId] = useState(datasets[0]?.cardId || null)

  const selectedDataset = datasets.find((d) => d.cardId === selectedDatasetId) || datasets[0] || null

  if (!city) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Unknown city</Typography>
        <Button onClick={() => navigate('/')}>Back</Button>
      </Box>
    )
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', bgcolor: 'background.default' }}>
      <DetailsSidebar
        open={sidebarOpen}
        city={city}
        datasets={datasets}
        selectedId={selectedDatasetId}
        onSelect={(id) => setSelectedDatasetId(id)}
      />

      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'rgba(2, 6, 23, 0.55)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid',
            borderColor: 'rgba(148, 163, 184, 0.18)',
          }}
        >
          <Toolbar sx={{ gap: 1.25, minHeight: 56, transform: 'translateX(-30px)' }}>
            <IconButton aria-label="Collapse sidebar" onClick={() => setSidebarOpen((v) => !v)}>
              <MenuOpenRounded
                sx={{
                  transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 180ms ease',
                }}
              />
            </IconButton>
            <IconButton onClick={() => navigate('/')} edge="start" aria-label="Back">
              <ArrowBackRounded />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(148, 163, 184, 0.18)' }} />

            <Stack spacing={0} sx={{ minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight={900} noWrap>
                Sample Stack
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {city.displayName} • Track id: {selectedDataset ? selectedDataset.cardId : '—'}
              </Typography>
            </Stack>

            <Box sx={{ flex: 1 }} />

            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label="FORECAST 89%"
                size="small"
                sx={{
                  bgcolor: 'rgba(15, 23, 42, 0.55)',
                  border: '1px solid rgba(148, 163, 184, 0.18)',
                  fontWeight: 900,
                }}
              />
              <Chip
                label="FORECAST 80%"
                size="small"
                sx={{
                  bgcolor: 'rgba(15, 23, 42, 0.55)',
                  border: '1px solid rgba(148, 163, 184, 0.18)',
                  fontWeight: 900,
                }}
              />
            </Stack>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: { xs: 2, md: 3 }, flex: 1, minHeight: 0 }}>
          {selectedDataset ? (
            <ConsumptionPanel city={city} dataset={selectedDataset} />
          ) : (
            <Typography color="text.secondary">No datasets available.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

