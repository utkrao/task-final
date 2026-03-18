import { Box, Paper, Stack, Typography } from '@mui/material'
import CityWidget from './CityWidget.jsx'

function getDockSx(alignment) {
  const common = {
    position: 'absolute',
    pointerEvents: 'auto',
    zIndex: 500,
  }

  switch (alignment) {
    case 'right':
      return { ...common, top: 72, right: 16, bottom: 16, width: 360 }
    case 'top':
      return { ...common, top: 96, left: 16, right: 16 }
    case 'bottom':
      return { ...common, left: 16, right: 16, bottom: 16 }
    case 'left':
    default:
      return { ...common, top: 72, left: 16, bottom: 16, width: 360 }
  }
}

export default function CityWidgetDock({ alignment = 'left', cities, onSelectCity }) {
  const isHorizontal = alignment === 'top' || alignment === 'bottom'

  return (
    <Paper
      elevation={0}
      sx={{
        ...getDockSx(alignment),
        border: '1px solid',
        borderColor: 'rgba(45, 212, 191, 0.22)',
        bgcolor: 'rgba(2, 6, 23, 0.40)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle2" fontWeight={900}>
          Cities
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Hover the mini chart for values • Click a card to open details
        </Typography>
      </Box>

      <Box
        sx={{
          p: 1.5,
          maxHeight: isHorizontal ? 220 : '100%',
          overflow: 'auto',
        }}
      >
        <Stack
          direction={isHorizontal ? 'row' : 'column'}
          spacing={1.5}
          sx={{
            minWidth: isHorizontal ? 'max-content' : 'auto',
          }}
        >
          {cities.map((c) => (
            <CityWidget key={c.cityId} city={c} onClick={() => onSelectCity?.(c.cityId)} />
          ))}
        </Stack>
      </Box>
    </Paper>
  )
}

