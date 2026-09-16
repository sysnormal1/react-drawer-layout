import { ReactNode } from 'react';
export interface TopAppBarProps {
    defaultTitle?: ReactNode;
    drawerWidth?: number;
    hasDrawer?: boolean;
    showThemeToggle?: boolean;
    actions?: ReactNode;
    /**
     * `true` quando o drawer é temporário (tela pequena): ele cobre a página em vez
     * de ocupar uma coluna, então a barra não se desloca e o botão de menu fica
     * sempre visível.
     */
    overlayDrawer?: boolean;
}
export default function TopAppBar({ defaultTitle, drawerWidth, hasDrawer, showThemeToggle, actions, overlayDrawer }: TopAppBarProps): import("react").JSX.Element;
//# sourceMappingURL=TopAppBar.d.ts.map