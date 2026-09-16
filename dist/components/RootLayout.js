import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/RootLayout.tsx
import { Box, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { RootLayoutProvider, useRootLayoutContext } from './RootLayoutContext.js';
import TopAppBar from './TopAppBar.js';
import LeftDrawer from './LeftDrawer.js';
function RootLayoutInner({ children, topBar, topBarProps, drawer, drawerWidth: initialDrawerWidth = 240, drawerItems, drawerTypography, hasExternalTheme, currentPath, onNavigate, translater, }) {
    const { theme, drawerCollapsed, setDrawerCollapsed, drawerWidth, // ← largura atual do context
    setDrawerWidth, // ← atualizada pelo LeftDrawer
     } = useRootLayoutContext();
    /* Ao ENTRAR em tela pequena o menu fecha — girar o celular ou estreitar a
       janela não pode deixar um drawer temporário cobrindo a página. Ao sair, o
       estado fica como está: no desktop quem decide é a pessoa. */
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
    useEffect(() => {
        if (isSmallScreen)
            setDrawerCollapsed(true);
    }, [isSmallScreen, setDrawerCollapsed]);
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, { enableColorScheme: true }), topBar && (_jsx(TopAppBar, { ...topBarProps, drawerWidth: drawerWidth, hasDrawer: drawer, overlayDrawer: isSmallScreen, showThemeToggle: !hasExternalTheme })), _jsxs(Box, { sx: { display: 'flex' }, children: [drawer && (_jsx(LeftDrawer, { collapsed: drawerCollapsed, setCollapsed: setDrawerCollapsed, width: initialDrawerWidth, items: drawerItems, currentPath: currentPath, onNavigate: onNavigate, typography: drawerTypography, onWidthChange: setDrawerWidth, translater: translater })), _jsx(Box, { component: "main", sx: {
                            flexGrow: 1,
                            p: 3,
                            mt: topBar ? 8 : 0,
                        }, children: children })] })] }));
}
export default function RootLayout({ theme, topBar = true, drawer = true, drawerWidth = 240, drawerItems, drawerTypography, topBarProps, currentPath, onNavigate, translater, children, }) {
    return (_jsx(RootLayoutProvider, { externalTheme: theme, initialDrawerWidth: drawerWidth, defaultTopBarTitle: topBarProps?.defaultTitle, children: _jsx(RootLayoutInner, { topBar: topBar, topBarProps: topBarProps, drawer: drawer, drawerWidth: drawerWidth, drawerItems: drawerItems, drawerTypography: drawerTypography, hasExternalTheme: !!theme, currentPath: currentPath, onNavigate: onNavigate, translater: translater, children: children }) }));
}
