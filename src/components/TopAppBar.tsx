// src/components/TopAppBar.tsx - sem props de tema, sem props de auth, sem closure issues
import {
  AppBar as MuiAppBar, Toolbar, IconButton,
  Typography, Tooltip, Box, styled
} from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon } from '@mui/icons-material';
import { ReactNode } from 'react';
import { useRootLayoutContext } from './RootLayoutContext.js';

const AppBar: any = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'drawerOpen' && prop !== 'drawerWidth' && prop !== 'overlayDrawer',
})(({ theme, drawerOpen, drawerWidth, overlayDrawer }: any) => ({
  /* No desktop a barra passa por cima do mini-drawer; com drawer temporário é o
     contrário — o menu aberto cobre a barra, senão ela esconde a busca e o botão
     de fechar que ficam no topo dele. */
  zIndex: overlayDrawer ? theme.zIndex.appBar : theme.zIndex.drawer + 1,
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
  /**
   * `true` quando o drawer é temporário (tela pequena): ele cobre a página em vez
   * de ocupar uma coluna, então a barra não se desloca e o botão de menu fica
   * sempre visível.
   */
  overlayDrawer?: boolean;
}

export default function TopAppBar({
  defaultTitle,
  drawerWidth = 240,
  hasDrawer = true,
  showThemeToggle = true,
  actions,
  overlayDrawer = false
}: TopAppBarProps) {
  const {
    mode, toggleMode,
    drawerCollapsed, setDrawerCollapsed,
    topBarTitle, topBarChildren,
  } = useRootLayoutContext();

  return (
    <AppBar
      position="fixed"
      drawerOpen={hasDrawer && !drawerCollapsed && !overlayDrawer}
      drawerWidth={drawerWidth}
      overlayDrawer={overlayDrawer}
    >
      <Toolbar>
        {hasDrawer && (
          <Tooltip title="Expandir/recolher menu">
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerCollapsed(!drawerCollapsed)}
              sx={{
                marginRight: overlayDrawer ? 1 : 5,
                ...(!drawerCollapsed && !overlayDrawer && { display: 'none' }),
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