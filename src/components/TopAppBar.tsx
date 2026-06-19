// src/components/TopAppBar.tsx - sem props de tema, sem props de auth, sem closure issues
import {
  AppBar as MuiAppBar, Toolbar, IconButton,
  Typography, Tooltip, Box, styled
} from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon } from '@mui/icons-material';
import { ReactNode } from 'react';
import { useRootLayoutContext } from './RootLayoutContext.js';

const AppBar: any = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'drawerOpen' && prop !== 'drawerWidth',
})(({ theme, drawerOpen, drawerWidth }: any) => ({
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

export interface TopAppBarProps {
  // título padrão usado quando nenhuma tela define um via useTopBar
  defaultTitle?: ReactNode;
  drawerWidth?: number;
  hasDrawer?: boolean;
  showThemeToggle?: boolean;
  actions?: ReactNode; // ← slot fixo, ex: UserMenu
}

export default function TopAppBar({
  defaultTitle,
  drawerWidth = 240,
  hasDrawer = true,
  showThemeToggle = true,
  actions
}: TopAppBarProps) {
  const {
    mode, toggleMode,
    drawerCollapsed, setDrawerCollapsed,
    topBarTitle, topBarChildren,
  } = useRootLayoutContext();

  console.debug("actons",actions);

  return (
    <AppBar
      position="fixed"
      drawerOpen={hasDrawer && !drawerCollapsed}
      drawerWidth={drawerWidth}
    >
      <Toolbar>
        {hasDrawer && (
          <Tooltip title="Expandir/recolher menu">
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerCollapsed(!drawerCollapsed)}
              sx={{
                marginRight: 5,
                ...(!drawerCollapsed && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        )}

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {topBarTitle ?? defaultTitle}
        </Typography>

        {/* injetado dinamicamente pelas telas via useTopBar */}
        {topBarChildren}

        {showThemeToggle && (
          <Tooltip title={`Mudar para tema ${mode === 'light' ? 'escuro' : 'claro'}`}>
            <IconButton color="inherit" onClick={toggleMode}>
              {mode === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>
        )}
        {actions}
      </Toolbar>
    </AppBar>
  );
}