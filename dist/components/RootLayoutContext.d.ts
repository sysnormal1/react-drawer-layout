import { ReactNode } from 'react';
import { Theme, PaletteMode } from '@mui/material';
interface RootLayoutContextValue {
    mode: PaletteMode;
    toggleMode: () => void;
    drawerCollapsed: boolean;
    setDrawerCollapsed: (value: boolean) => void;
    theme: Theme;
}
export declare function RootLayoutProvider({ children, externalTheme, }: {
    children: ReactNode;
    externalTheme?: Theme;
}): import("react").JSX.Element;
export declare function useRootLayoutContext(): RootLayoutContextValue;
export {};
//# sourceMappingURL=RootLayoutContext.d.ts.map