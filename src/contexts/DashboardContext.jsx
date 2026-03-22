import { createContext, useContext } from 'react';

const DashboardContext = createContext();

export function DashboardProvider({ children, cities }) {
  const value = { cities };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}
