## Machine Coding Dashboard (React + Vite)

Implements the 2-page dashboard from `Machine coding interview.pdf`:

- **Landing page (`/`)**: interactive world map (zoom/pan + initial zoom-in animation) with city markers and hover tooltips, plus a configurable **city widget dock** with mini line charts (tooltip on hover) and internal scrolling when many widgets exist.
- **Details page (`/details/:cityId`)**: collapsible sidebar with dataset “cards”, back navigation, and a main panel where selecting a card updates **header + chart + table + card ID**. Chart has **switches** to show/hide lines and hover tooltips per quarter.

### Tech

- **React + JavaScript** (Vite)
- **MUI** for layout/components + responsive design
- **React Router** for navigation
- **React Leaflet / Leaflet** for world map
- **Recharts** for mini sparkline charts and main chart

### Run locally

```bash
npm install
npm run dev
```

### Where the mock data lives

- **Cities + city metrics + sparklines**: `src/mock/mockData.js`
- **City datasets (sidebar cards) + quarter series**: `src/mock/mockData.js`
- **Config (widget alignment, quarter counts)**: `src/mock/dashboardConfig.js`

### What to explain (interview-ready)

- **Component hierarchy & reusability**
  - `App.jsx` defines routes.
  - Landing: `LandingPage` → `WorldMap` + `CityWidgetDock` → `CityWidget` + `MiniSparkline`.
  - Details: `DetailsPage` → `DetailsSidebar` + `ConsumptionPanel` → `ConsumptionChart` + `QuarterTable`.
- **State management strategy**
  - Local state via React hooks:
    - Landing: `alignment` state for dock placement (mimics config).
    - Details: `sidebarOpen` + `selectedDatasetId`.
  - Route param `cityId` is the source of truth for the selected city.
  - Mock “data access” is centralized in `src/mock/mockData.js`.
- **Styling & responsiveness**
  - MUI `sx` props + responsive breakpoints (`xs`, `sm`, `md`, `lg`) for layout.
  - Dock uses internal overflow scrolling so the rest of the page stays fixed.

