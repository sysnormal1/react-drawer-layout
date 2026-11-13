import { DrawerAppearance, DrawerItem, DrawerItemTypography } from './DrawerItem.js';
interface DrawerItemListProps {
    items: DrawerItem[];
    collapsed?: boolean;
    currentPath?: string;
    onNavigate?: (path: string) => void;
    searchQuery?: string;
    typography?: DrawerItemTypography;
    appearance?: DrawerAppearance;
}
export declare function DrawerItemList({ items, collapsed, currentPath, onNavigate, searchQuery, typography, appearance }: DrawerItemListProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=DrawerItemList.d.ts.map