import { DrawerProps as MuiDrawerProps } from "@mui/material";
import React from "react";
import { DrawerItem } from './DrawerItem.js';
export interface LeftDrawerProps extends Omit<MuiDrawerProps, 'open'> {
    collapsed?: boolean;
    width?: number | string;
    items?: DrawerItem[];
    translater?: (key: string) => string;
    searchText?: string;
    setCollapsed?: (value: boolean) => void;
    currentPath?: string;
    onNavigate?: (path: string) => void;
}
declare const LeftDrawer: React.ForwardRefExoticComponent<Omit<LeftDrawerProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export default LeftDrawer;
//# sourceMappingURL=LeftDrawer.d.ts.map