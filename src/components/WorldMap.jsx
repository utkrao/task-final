import { useEffect } from 'react'
import { Box, Chip, Stack, Typography } from '@mui/material'
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'

import markerIcon2xUrl from 'leaflet/dist/images/marker-icon-2x.png'
import markerIconUrl from 'leaflet/dist/images/marker-icon.png'
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2xUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
})

function IntroZoom() {
  const map = useMap()

  useEffect(() => {
    const center = map.getCenter()
    const zoom = map.getZoom()
    map.setView(center, Math.max(1, zoom - 0.8), { animate: false })
    map.flyTo(center, zoom + 0.9, { duration: 1.6, easeLinearity: 0.2 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default function WorldMap({ cities, onCityClick }) {
  return (
    <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <MapContainer
        center={[20, 0]}
        zoom={1.6}
        minZoom={1}
        maxZoom={6}
        zoomControl
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
      >
        <IntroZoom />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {cities.map((c) => (
          <Marker
            key={c.cityId}
            position={[c.geo.lat, c.geo.lng]}
            eventHandlers={{
              click: () => onCityClick?.(c.cityId),
            }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1} sticky>
              <Stack spacing={0.5} sx={{ minWidth: 180 }}>
                <Typography variant="subtitle2" fontWeight={800}>
                  {c.displayName}, {c.countryCode}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip size="small" label={c.mapTooltip.metric} />
                  <Typography variant="body2" fontWeight={700}>
                    {c.mapTooltip.value} {c.mapTooltip.unit}
                  </Typography>
                </Stack>
              </Stack>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  )
}

