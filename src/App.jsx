import { Route, Routes } from "react-router-dom";
import { AppBar, Avatar, Box, Typography } from "@mui/material";
import { citiesResponse } from "./data/dashboardData.js";
import { DashboardProvider } from "./contexts/DashboardContext.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";

function App() {
  return (
    <DashboardProvider cities={citiesResponse}>
      <Box sx={{ height: "100%", minHeight: 0 }}>
        <AppBar
          elevation={0}
          sx={{
            bgcolor: "rgba(2, 6, 23)",
            borderBottom: "1px solid",
            borderColor: "rgba(148, 163, 184, 0.18)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
            paddingX: 3,
          }}
        >
          <Typography variant="subtitle1" fontWeight={900}>
            Webapp
          </Typography>
          <Avatar
            sx={{ width: 28, height: 28, bgcolor: "rgba(45, 212, 191, 0.18)" }}
          >
            U
          </Avatar>
        </AppBar>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/details/:cityId" element={<DetailsPage />} />
        </Routes>
      </Box>
    </DashboardProvider>
  );
}

export default App;
