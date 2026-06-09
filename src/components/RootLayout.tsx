// src/components/RootLayout.tsx - orquestra tudo
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { Theme } from '@mui/material';
import { RootLayoutProvider, useRootLayoutContext } from './RootLayoutContext.js';
import TopAppBar, { TopAppBarProps } from './TopAppBar.js';
import LeftDrawer from './LeftDrawer.js';
import { DrawerItem } from './DrawerItem.js';

interface RootLayoutProps {
  children?: ReactNode;
  theme?: Theme;
  topBar?: boolean;
  topBarProps?: Omit<TopAppBarProps, 'showThemeToggle' | 'hasDrawer' | 'drawerWidth'>;
  drawer?: boolean;
  drawerWidth?: number;
  drawerItems?: DrawerItem[];
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

// componente interno que já tem acesso ao context
function RootLayoutInner({
  children,
  topBar,
  topBarProps,
  drawer,
  drawerWidth,
  drawerItems,
  hasExternalTheme,
  currentPath,
  onNavigate,
}: RootLayoutProps & { hasExternalTheme: boolean }) {
  const { theme, drawerCollapsed, setDrawerCollapsed } = useRootLayoutContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {topBar && (
        <TopAppBar
          {...topBarProps}
          drawerWidth={drawerWidth}
          hasDrawer={drawer}
          showThemeToggle={!hasExternalTheme}
        />
      )}
      <Box sx={{ display: 'flex' }}>
        {drawer && (
          <LeftDrawer
            collapsed={drawerCollapsed}
            setCollapsed={setDrawerCollapsed}
            width={drawerWidth}
            items={drawerItems}
            currentPath={currentPath}
            onNavigate={onNavigate}
          />
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: topBar ? 8 : 0,
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function RootLayout({
  theme,
  topBar = true,
  drawer = true,
  drawerWidth = 240,
  drawerItems,
  topBarProps,
  currentPath,
  onNavigate,
  children,
}: RootLayoutProps) {
  return (
    <RootLayoutProvider externalTheme={theme}>
      <RootLayoutInner
        topBar={topBar}
        topBarProps={topBarProps}
        drawer={drawer}
        drawerWidth={drawerWidth}
        drawerItems={drawerItems}
        hasExternalTheme={!!theme}
        currentPath={currentPath}
        onNavigate={onNavigate}
      >
        {children}
      </RootLayoutInner>
    </RootLayoutProvider>
  );
}