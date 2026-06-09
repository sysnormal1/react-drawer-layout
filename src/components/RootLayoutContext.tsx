// src/components/RootLayoutContext.tsx - contexto interno da lib
import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { createTheme, Theme, PaletteMode } from '@mui/material';

interface RootLayoutContextValue {
  mode: PaletteMode;
  toggleMode: () => void;
  drawerCollapsed: boolean;
  setDrawerCollapsed: (value: boolean) => void;
  theme: Theme;
}

const RootLayoutContext = createContext<RootLayoutContextValue | null>(null);

export function RootLayoutProvider({
  children,
  externalTheme,
}: {
  children: ReactNode;
  externalTheme?: Theme;
}) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);

  // sem closure freeze: sempre lê o prev mais recente
  const toggleMode = () => setMode(prev => prev === 'light' ? 'dark' : 'light');

  const internalTheme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  );

  return (
    <RootLayoutContext.Provider value={{
      mode,
      toggleMode,
      drawerCollapsed,
      setDrawerCollapsed,
      theme: externalTheme ?? internalTheme,
    }}>
      {children}
    </RootLayoutContext.Provider>
  );
}

export function useRootLayoutContext() {
  const ctx = useContext(RootLayoutContext);
  if (!ctx) throw new Error('useRootLayoutContext must be used inside RootLayout');
  return ctx;
}