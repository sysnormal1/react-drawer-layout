import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/TopAppBar.tsx - sem props de tema, sem props de auth, sem closure issues
import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, Tooltip, styled } from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon } from '@mui/icons-material';
import { useRootLayoutContext } from './RootLayoutContext.js';
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'drawerOpen' && prop !== 'drawerWidth',
})(({ theme, drawerOpen, drawerWidth }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(drawerOpen && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
export default function TopAppBar({ defaultTitle, drawerWidth = 240, hasDrawer = true, showThemeToggle = true, actions }) {
    const { mode, toggleMode, drawerCollapsed, setDrawerCollapsed, topBarTitle, topBarChildren, } = useRootLayoutContext();
    console.debug("actons", actions);
    return (_jsx(AppBar, { position: "fixed", drawerOpen: hasDrawer && !drawerCollapsed, drawerWidth: drawerWidth, children: _jsxs(Toolbar, { children: [hasDrawer && (_jsx(Tooltip, { title: "Expandir/recolher menu", children: _jsx(IconButton, { color: "inherit", edge: "start", onClick: () => setDrawerCollapsed(!drawerCollapsed), sx: {
                            marginRight: 5,
                            ...(!drawerCollapsed && { display: 'none' }),
                        }, children: _jsx(MenuIcon, {}) }) })), _jsx(Typography, { variant: "h6", sx: { flexGrow: 1 }, children: topBarTitle ?? defaultTitle }), topBarChildren, showThemeToggle && (_jsx(Tooltip, { title: `Mudar para tema ${mode === 'light' ? 'escuro' : 'claro'}`, children: _jsx(IconButton, { color: "inherit", onClick: toggleMode, children: mode === 'light' ? _jsx(DarkMode, {}) : _jsx(LightMode, {}) }) })), actions] }) }));
}
