import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/RootLayout.tsx - orquestra tudo
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { RootLayoutProvider, useRootLayoutContext } from './RootLayoutContext.js';
import TopAppBar from './TopAppBar.js';
import LeftDrawer from './LeftDrawer.js';
// componente interno que já tem acesso ao context
function RootLayoutInner({ children, topBar, topBarProps, drawer, drawerWidth, drawerItems, hasExternalTheme, currentPath, onNavigate, }) {
    const { theme, drawerCollapsed, setDrawerCollapsed } = useRootLayoutContext();
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, { enableColorScheme: true }), topBar && (_jsx(TopAppBar, { ...topBarProps, drawerWidth: drawerWidth, hasDrawer: drawer, showThemeToggle: !hasExternalTheme })), _jsxs(Box, { sx: { display: 'flex' }, children: [drawer && (_jsx(LeftDrawer, { collapsed: drawerCollapsed, setCollapsed: setDrawerCollapsed, width: drawerWidth, items: drawerItems, currentPath: currentPath, onNavigate: onNavigate })), _jsx(Box, { component: "main", sx: {
                            flexGrow: 1,
                            p: 3,
                            mt: topBar ? 8 : 0,
                        }, children: children })] })] }));
}
export default function RootLayout({ theme, topBar = true, drawer = true, drawerWidth = 240, drawerItems, topBarProps, currentPath, onNavigate, children, }) {
    return (_jsx(RootLayoutProvider, { externalTheme: theme, children: _jsx(RootLayoutInner, { topBar: topBar, topBarProps: topBarProps, drawer: drawer, drawerWidth: drawerWidth, drawerItems: drawerItems, hasExternalTheme: !!theme, currentPath: currentPath, onNavigate: onNavigate, children: children }) }));
}
