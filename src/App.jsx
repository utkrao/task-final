import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import { citiesResponse } from './data/dashboardData.js'
import { DashboardProvider } from './contexts/DashboardContext.jsx'
import LandingPage from './pages/LandingPage.jsx'
import DetailsPage from './pages/DetailsPage.jsx'

function App() {
  return (
    <DashboardProvider cities={citiesResponse}>
      <Box sx={{ height: '100%', minHeight: 0 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/details/:cityId" element={<DetailsPage />} />
        </Routes>
      </Box>
    </DashboardProvider>
  )
}

export default App
