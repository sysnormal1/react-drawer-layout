import { jsx as _jsx } from "react/jsx-runtime";
// src/components/RootLayoutContext.tsx
import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme } from '@mui/material';
function getSystemTheme() {
    if (typeof window === 'undefined')
        return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
const STORAGE_KEY = 'sysnormalTheme'; // chave comum de sysnormal
function getInitialMode() {
    if (typeof window === 'undefined')
        return 'light';
    const stored = localStorage?.getItem(STORAGE_KEY);
    return stored ?? getSystemTheme();
}
const RootLayoutContext = createContext(null);
export function RootLayoutProvider({ children, externalTheme, initialDrawerWidth = 240, defaultTopBarTitle, }) {
    const [mode, setMode] = useState(getInitialMode);
    const [drawerCollapsed, setDrawerCollapsed] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState(initialDrawerWidth);
    const [topBarTitle, setTopBarTitle] = useState(defaultTopBarTitle);
    const [topBarChildren, setTopBarChildren] = useState(null);
    // escuta mudanças de tema do sistema em tempo real
    useEffect(() => {
        if (externalTheme)
            return; // se tem tema externo, não interfere
        const stored = localStorage?.getItem(STORAGE_KEY);
        if (stored)
            return; // usuário já escolheu manualmente, respeita a escolha
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e) => {
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
    const internalTheme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
    return (_jsx(RootLayoutContext.Provider, { value: {
            mode, toggleMode,
            drawerCollapsed, setDrawerCollapsed,
            drawerWidth, setDrawerWidth,
            theme: externalTheme ?? internalTheme,
            topBarTitle, setTopBarTitle,
            topBarChildren, setTopBarChildren,
        }, children: children }));
}
export function useRootLayoutContext() {
    const ctx = useContext(RootLayoutContext);
    if (!ctx)
        throw new Error('useRootLayoutContext must be used inside RootLayout');
    return ctx;
}
