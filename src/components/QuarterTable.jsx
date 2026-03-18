import {
  Box,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

function fmt(v) {
  if (v == null) return '—'
  return String(v)
}

export default function QuarterTable({ data }) {
  const quarters = data.map((d) => ({ key: d.key, label: d.quarterShort }))

  const rows = [
    { key: 'consumption', label: 'Consumption', get: (d) => d.consumption },
    { key: 'aiForecast', label: 'AI Forecast', get: (d) => d.aiForecast },
    { key: 'finalForecast', label: 'Final Forecast', get: (d) => d.finalForecast },
  ]

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography variant="subtitle2" fontWeight={900}>
          Consumption (Thousands)
        </Typography>
        <Typography variant="caption" color="text.secondary">
          3 rows × {quarters.length} quarters
        </Typography>
      </Stack>
      <Divider sx={{ mb: 1.25, borderColor: 'rgba(148, 163, 184, 0.14)' }} />

      <TableContainer
        sx={{
          flex: 1,
          minHeight: 0,
          border: '1px solid',
          borderColor: 'rgba(148, 163, 184, 0.18)',
          borderRadius: 2,
          bgcolor: 'rgba(2, 6, 23, 0.25)',
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 900,
                  bgcolor: 'rgba(2, 6, 23, 0.65)',
                  borderBottomColor: 'rgba(148, 163, 184, 0.18)',
                }}
              >
                Series
              </TableCell>
              {quarters.map((q) => (
                <TableCell
                  key={q.key}
                  align="right"
                  sx={{
                    fontWeight: 900,
                    whiteSpace: 'nowrap',
                    bgcolor: 'rgba(2, 6, 23, 0.65)',
                    borderBottomColor: 'rgba(148, 163, 184, 0.18)',
                  }}
                >
                  {q.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.key} hover>
                <TableCell
                  sx={{
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                    borderBottomColor: 'rgba(148, 163, 184, 0.12)',
                  }}
                >
                  {r.label}
                </TableCell>
                {data.map((d) => (
                  <TableCell
                    key={`${r.key}-${d.key}`}
                    align="right"
                    sx={{ borderBottomColor: 'rgba(148, 163, 184, 0.12)' }}
                  >
                    {fmt(r.get(d))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

