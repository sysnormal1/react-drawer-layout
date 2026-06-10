import { ReactNode } from 'react';
import { Theme } from '@mui/material';
import { TopAppBarProps } from './TopAppBar.js';
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
}
export default function RootLayout({ theme, topBar, drawer, drawerWidth, drawerItems, drawerTypography, topBarProps, currentPath, onNavigate, children, }: RootLayoutProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=RootLayout.d.ts.map