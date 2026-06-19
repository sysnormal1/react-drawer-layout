// src/components/RootLayout.tsx
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { Theme } from '@mui/material';
import { RootLayoutProvider, useRootLayoutContext } from './RootLayoutContext.js';
import TopAppBar, { TopAppBarProps } from './TopAppBar.js';
import LeftDrawer from './LeftDrawer.js';
import { DrawerItem, DrawerItemTypography } from './DrawerItem.js';

interface RootLayoutProps {
  children?: ReactNode;
  theme?: Theme;
  topBar?: boolean;
  topBarProps?: Omit<TopAppBarProps, 'showThemeToggle' | 'hasDrawer' | 'drawerWidth'>;
  drawer?: boolean;
  drawerWidth?: number;
  drawerItems?: DrawerItem[];
  drawerTypography?: DrawerItemTypography;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  translater?: (text: string) => string;
}

function RootLayoutInner({
  children,
  topBar,
  topBarProps,
  drawer,
  drawerWidth: initialDrawerWidth = 240,
  drawerItems,
  drawerTypography,
  hasExternalTheme,
  currentPath,
  onNavigate,
  translater,
}: RootLayoutProps & { hasExternalTheme: boolean }) {
  const {
    theme,
    drawerCollapsed,
    setDrawerCollapsed,
    drawerWidth,        // ← largura atual do context
    setDrawerWidth,     // ← atualizada pelo LeftDrawer
  } = useRootLayoutContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {topBar && (
        <TopAppBar
          {...topBarProps}
          drawerWidth={drawerWidth}   // ← usa o do context, acompanha resize
          hasDrawer={drawer}
          showThemeToggle={!hasExternalTheme}
        />
      )}
      <Box sx={{ display: 'flex' }}>
        {drawer && (
          <LeftDrawer
            collapsed={drawerCollapsed}
            setCollapsed={setDrawerCollapsed}
            width={initialDrawerWidth}
            items={drawerItems}
            currentPath={currentPath}
            onNavigate={onNavigate}
            typography={drawerTypography}
            onWidthChange={setDrawerWidth}  // ← callback para notificar o context
            translater={translater}
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
  drawerTypography,
  topBarProps,
  currentPath,
  onNavigate,
  translater,
  children,
}: RootLayoutProps) {
  return (
    <RootLayoutProvider
      externalTheme={theme}
      initialDrawerWidth={drawerWidth}
      defaultTopBarTitle={topBarProps?.defaultTitle}
    >
      <RootLayoutInner
        topBar={topBar}
        topBarProps={topBarProps}
        drawer={drawer}
        drawerWidth={drawerWidth}
        drawerItems={drawerItems}
        drawerTypography={drawerTypography}
        hasExternalTheme={!!theme}
        currentPath={currentPath}
        onNavigate={onNavigate}
        translater={translater}
      >
        {children}
      </RootLayoutInner>
    </RootLayoutProvider>
  );
}