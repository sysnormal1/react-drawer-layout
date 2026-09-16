import { ReactNode } from 'react';
import { Theme, PaletteMode } from '@mui/material';
/**
 * Mesmo corte do `theme.breakpoints.down('sm')` padrão do MUI (600px).
 *
 * Em tela pequena o drawer é temporário — ele cobre a página em vez de dividir a
 * largura com ela —, e por isso precisa NASCER fechado. Começar aberto fazia o
 * menu cobrir a tela inteira a cada carga no celular.
 */
export declare const SMALL_SCREEN_QUERY = "(max-width:599.95px)";
interface RootLayoutContextValue {
    mode: PaletteMode;
    toggleMode: () => void;
    drawerCollapsed: boolean;
    setDrawerCollapsed: (value: boolean) => void;
    drawerWidth: number;
    setDrawerWidth: (value: number) => void;
    theme: Theme;
    topBarTitle: ReactNode;
    setTopBarTitle: (value: ReactNode) => void;
    topBarChildren: ReactNode;
    setTopBarChildren: (value: ReactNode) => void;
}
export declare function RootLayoutProvider({ children, externalTheme, initialDrawerWidth, defaultTopBarTitle, }: {
    children: ReactNode;
    externalTheme?: Theme;
    initialDrawerWidth?: number;
    defaultTopBarTitle?: ReactNode;
}): import("react").JSX.Element;
export declare function useRootLayoutContext(): RootLayoutContextValue;
export {};
//# sourceMappingURL=RootLayoutContext.d.ts.map