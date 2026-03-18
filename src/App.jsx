import { Navigate, Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import LandingPage from './pages/LandingPage.jsx'
import DetailsPage from './pages/DetailsPage.jsx'

function App() {
  return (
    <Box sx={{ height: '100%', minHeight: 0 }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/details/:cityId" element={<DetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  )
}

export default App
