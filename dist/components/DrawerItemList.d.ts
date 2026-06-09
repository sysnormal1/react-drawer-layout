import { DrawerItem } from './DrawerItem.js';
interface DrawerItemListProps {
    items: DrawerItem[];
    collapsed?: boolean;
    currentPath?: string;
    onNavigate?: (path: string) => void;
    searchQuery?: string;
}
export declare function DrawerItemList({ items, collapsed, currentPath, onNavigate, searchQuery, }: DrawerItemListProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=DrawerItemList.d.ts.map