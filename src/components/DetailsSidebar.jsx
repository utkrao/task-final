import {
  Box,
  Chip,
  Divider,
  Drawer,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  OutlinedInput,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'

const EXPANDED = 320
const COLLAPSED = 84

function DetailsSidebar({ open, city, datasets, selectedId, onSelect }) {
  const width = open ? EXPANDED : COLLAPSED

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          position: 'relative',
          whiteSpace: 'nowrap',
          width,
          transition: (t) => t.transitions.create('width', { duration: 180 }),
          overflowX: 'hidden',
          borderRight: '1px solid',
          borderColor: 'rgba(148, 163, 184, 0.18)',
          bgcolor: 'rgba(2, 6, 23, 0.55)',
          backgroundImage:
            'linear-gradient(180deg, rgba(2,6,23,0.72) 0%, rgba(2,6,23,0.35) 55%, rgba(2,6,23,0.72) 100%)',
          backdropFilter: 'blur(10px)',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Stack spacing={0.5}>
          <Typography variant="subtitle2" fontWeight={900} noWrap>
            {open ? 'Sample Stack' : 'STACK'}
          </Typography>
          {open ? (
            <Typography variant="caption" color="text.secondary">
              {city.displayName} • select a card to update chart
            </Typography>
          ) : null}
        </Stack>
      </Box>
      <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.18)' }} />

      {open ? (
        <Box sx={{ px: 2, pt: 1.5 }}>
          <Tabs
            value={0}
            variant="fullWidth"
            sx={{
              minHeight: 32,
              '& .MuiTab-root': { minHeight: 32, fontSize: 11, fontWeight: 900 },
              '& .MuiTabs-indicator': { bgcolor: 'primary.main' },
            }}
          >
            <Tab label={`BACKLOG (${datasets.length})`} />
            <Tab label="PENDING (0)" />
            <Tab label="FINAL SIGN-OFF (0)" />
          </Tabs>
        </Box>
      ) : null}

      <List dense sx={{ px: 1.5, py: 1.5, overflow: 'auto' }}>
        {datasets.map((d) => (
          <ListItem key={d.cardId} disableGutters sx={{ mb: 1 }}>
            <ListItemButton
              selected={selectedId === d.cardId}
              onClick={() => onSelect?.(d.cardId)}
              sx={{
                borderRadius: 2,
                alignItems: 'flex-start',
                py: 1,
                px: open ? 1.25 : 1,
                border: '1px solid',
                borderColor:
                  selectedId === d.cardId ? 'rgba(45, 212, 191, 0.35)' : 'rgba(148, 163, 184, 0.14)',
                bgcolor: selectedId === d.cardId ? 'rgba(2, 6, 23, 0.35)' : 'rgba(15, 23, 42, 0.18)',
              }}
            >
              <Stack spacing={0.75} sx={{ width: '100%' }}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                  <Typography variant="body2" fontWeight={900} noWrap={!open}>
                    {open ? d.title : d.title.split(' ').map((w) => w[0]).join('')}
                  </Typography>
                  {open ? <Chip size="small" label="FCST" sx={{ height: 18, fontWeight: 900 }} /> : null}
                </Stack>
                {open ? (
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {d.subtitle}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {d.updatedAt?.slice?.(0, 10) || '—'}
                    </Typography>
                  </Stack>
                ) : null}
              </Stack>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default DetailsSidebar
