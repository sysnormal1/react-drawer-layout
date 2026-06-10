import { jsx as _jsx } from "react/jsx-runtime";
// src/components/RootLayoutContext.tsx - contexto interno da lib
import { createContext, useContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material';
const RootLayoutContext = createContext(null);
export function RootLayoutProvider({ children, externalTheme, initialDrawerWidth = 240, }) {
    const [mode, setMode] = useState('light');
    const [drawerCollapsed, setDrawerCollapsed] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState(initialDrawerWidth);
    // sem closure freeze: sempre lê o prev mais recente
    const toggleMode = () => setMode(prev => prev === 'light' ? 'dark' : 'light');
    const internalTheme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
    return (_jsx(RootLayoutContext.Provider, { value: {
            mode, toggleMode,
            drawerCollapsed, setDrawerCollapsed,
            drawerWidth, setDrawerWidth,
            theme: externalTheme ?? internalTheme,
        }, children: children }));
}
export function useRootLayoutContext() {
    const ctx = useContext(RootLayoutContext);
    if (!ctx)
        throw new Error('useRootLayoutContext must be used inside RootLayout');
    return ctx;
}
