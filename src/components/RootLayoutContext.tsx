// src/components/RootLayoutContext.tsx
import { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { createTheme, Theme, PaletteMode } from '@mui/material';

function getSystemTheme(): PaletteMode {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const STORAGE_KEY = 'sysnormalTheme'; // chave comum de sysnormal

function getInitialMode(): PaletteMode {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage?.getItem(STORAGE_KEY) as PaletteMode | null;
  return stored ?? getSystemTheme();
}

interface RootLayoutContextValue {
  mode: PaletteMode;
  toggleMode: () => void;
  drawerCollapsed: boolean;
  setDrawerCollapsed: (value: boolean) => void;
  drawerWidth: number;
  setDrawerWidth: (value: number) => void;
  theme: Theme;
  topBarTitle: ReactNode;
  setTopBarTitle: (value: ReactNode) => void;
  topBarChildren: ReactNode;
  setTopBarChildren: (value: ReactNode) => void;
}

const RootLayoutContext = createContext<RootLayoutContextValue | null>(null);

export function RootLayoutProvider({
  children,
  externalTheme,
  initialDrawerWidth = 240,
  defaultTopBarTitle,
}: {
  children: ReactNode;
  externalTheme?: Theme;
  initialDrawerWidth?: number;
  defaultTopBarTitle?: ReactNode;
}) {
  const [mode, setMode] = useState<PaletteMode>(getInitialMode);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(initialDrawerWidth);
  const [topBarTitle, setTopBarTitle] = useState<ReactNode>(defaultTopBarTitle);
  const [topBarChildren, setTopBarChildren] = useState<ReactNode>(null);

  // escuta mudanças de tema do sistema em tempo real
  useEffect(() => {
    if (externalTheme) return; // se tem tema externo, não interfere

    const stored = localStorage?.getItem(STORAGE_KEY);
    if (stored) return; // usuário já escolheu manualmente, respeita a escolha

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setMode(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [externalTheme]);

  const toggleMode = () => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage?.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const internalTheme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  );

  return (
    <RootLayoutContext.Provider value={{
      mode, toggleMode,
      drawerCollapsed, setDrawerCollapsed,
      drawerWidth, setDrawerWidth,
      theme: externalTheme ?? internalTheme,
      topBarTitle, setTopBarTitle,
      topBarChildren, setTopBarChildren,
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