import { DrawerProps as MuiDrawerProps } from "@mui/material";
import React from "react";
import { DrawerItem, DrawerItemTypography } from './DrawerItem.js';
export interface LeftDrawerProps extends Omit<MuiDrawerProps, 'open'> {
    collapsed?: boolean;
    width?: number | string;
    items?: DrawerItem[];
    translater?: (key: string) => string;
    searchText?: string;
    setCollapsed?: (value: boolean) => void;
    currentPath?: string;
    onNavigate?: (path: string) => void;
    typography?: DrawerItemTypography;
    resizable?: boolean;
    onWidthChange?: (width: number) => void;
}
declare const LeftDrawer: React.ForwardRefExoticComponent<Omit<LeftDrawerProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export default LeftDrawer;
//# sourceMappingURL=LeftDrawer.d.ts.map