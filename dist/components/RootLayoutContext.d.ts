import { ReactNode } from 'react';
import { Theme, PaletteMode } from '@mui/material';
interface RootLayoutContextValue {
    mode: PaletteMode;
    toggleMode: () => void;
    drawerCollapsed: boolean;
    setDrawerCollapsed: (value: boolean) => void;
    drawerWidth: number;
    setDrawerWidth: (value: number) => void;
    theme: Theme;
}
export declare function RootLayoutProvider({ children, externalTheme, initialDrawerWidth, }: {
    children: ReactNode;
    externalTheme?: Theme;
    initialDrawerWidth?: number;
}): import("react").JSX.Element;
export declare function useRootLayoutContext(): RootLayoutContextValue;
export {};
//# sourceMappingURL=RootLayoutContext.d.ts.map