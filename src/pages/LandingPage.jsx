import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { citiesResponse } from "../data/dashboardData.js";
import WorldMap from "../components/WorldMap.jsx";
import CityWidget from "../components/CityWidget.jsx";

export default function LandingPage() {
  const navigate = useNavigate();

  const cities = useMemo(() => citiesResponse, []);

  return (
    <Box sx={{ height: "100%", position: "relative", zIndex: 0, pointerEvents: 'none' }}>
      <WorldMap
        cities={cities}
        onCityClick={(cityId) => navigate(`/details/${cityId}`)}
      />

      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          bgcolor: "rgba(2, 6, 23, 0.55)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid",
          borderColor: "rgba(148, 163, 184, 0.18)",
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="subtitle1" fontWeight={900}>
            Webapp
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Badge
            color="info"
            badgeContent={2}
            sx={{ "& .MuiBadge-badge": { fontWeight: 800 } }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ pr: 1 }}>
              There are 2 to action items.
            </Typography>
          </Badge>
          <Avatar
            sx={{ width: 28, height: 28, bgcolor: "rgba(45, 212, 191, 0.18)" }}
          >
            U
          </Avatar>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth={false}
        elevation={0}
        sx={{
          position: "absolute",
          top: 72,
          bottom: 16,
          left: 16,
          right: 16,
          pointerEvents: "none",
          p: 1.5,
          zIndex: 1300,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pointerEvents: "auto", mb: 1.5 }}
        >
          <Typography variant="h5" fontWeight={900}>
            Hello User,
          </Typography>
        </Stack>
        <Box
          sx={{
            p: 1.5,
            maxHeight: "100%",
            overflow: "auto",
            pointerEvents: "auto",
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              minWidth: "auto",
            }}
          >
            {cities.map((c) => (
              <CityWidget
                key={c.cityId}
                city={c}
                onClick={() => navigate(`/details/${c.cityId}`)}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
