import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
  Chip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useDashboard } from "../contexts/DashboardContext.jsx";
import WorldMap from "../components/WorldMap.jsx";
import CityWidget from "../components/CityWidget.jsx";

export default function LandingPage() {
  const navigate = useNavigate();
  const { cities } = useDashboard();

  return (
    <Box sx={{ height: "100%", position: "relative", zIndex: 0 }}>
      <WorldMap
        cities={cities}
        onCityClick={(cityId) => navigate(`/details/${cityId}`)}
      />

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
          justifyContent="start"
          gap={2}
          sx={{ pointerEvents: "auto", mb: 1.5 }}
        >
          <Typography variant="h5" fontWeight={900}>
            Hello User,
          </Typography>
          <Chip
            icon={<InfoOutlinedIcon />}
            label="There are 2 to action items."
            sx={{
              backgroundColor: "#fefefe",
              color: "#000000",
              fontWeight: 500,
              "& .MuiChip-icon": {
                color: "#000000",
              },
            }}
          />
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
