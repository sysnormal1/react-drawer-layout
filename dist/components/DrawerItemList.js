import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/DrawerItemList.tsx
import { useState, useCallback } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
function matchesSearch(item, query) {
    if (!query)
        return true;
    const q = query.toLowerCase();
    if (item.label.toLowerCase().includes(q))
        return true;
    if (item.children?.some(child => matchesSearch(child, query)))
        return true;
    return false;
}
function DrawerItemRow({ item, collapsed, currentPath, onNavigate, searchQuery, depth = 0, typography, }) {
    const [open, setOpen] = useState(false);
    const hasChildren = !!item.children?.length;
    const isActive = !!item.path && currentPath?.startsWith(item.path);
    const handleClick = useCallback(() => {
        if (hasChildren) {
            setOpen(prev => !prev);
        }
        else if (item.path) {
            onNavigate?.(item.path);
        }
        else {
            item.onClick?.();
        }
    }, [hasChildren, item, onNavigate]);
    const button = (_jsxs(ListItemButton, { onClick: handleClick, selected: isActive, sx: { pl: 2 + depth * 2 }, children: [item.icon && (_jsx(ListItemIcon, { sx: {
                    minWidth: collapsed && depth === 0 ? 'unset' : 40, // ← era 36, aumentar para 40
                    mr: collapsed ? 0 : 1, // ← gap entre ícone e texto
                }, children: item.icon })), !collapsed && (_jsxs(_Fragment, { children: [_jsx(ListItemText, { primary: item.label, slotProps: {
                            primary: {
                                sx: {
                                    fontSize: typography?.fontSize ?? '0.825rem',
                                    fontFamily: typography?.fontFamily,
                                    fontWeight: typography?.fontWeight ?? 500,
                                    letterSpacing: typography?.letterSpacing ?? '0.02em',
                                }
                            }
                        } }), hasChildren && (open ? _jsx(ExpandLess, {}) : _jsx(ExpandMore, {}))] }))] }));
    return (_jsxs(_Fragment, { children: [collapsed && depth === 0 ? (_jsx(Tooltip, { title: item.label, placement: "right", children: button })) : (button), hasChildren && !collapsed && (_jsx(Collapse, { in: open, timeout: "auto", unmountOnExit: true, children: _jsx(List, { disablePadding: true, children: item.children
                        .filter(child => matchesSearch(child, searchQuery ?? ''))
                        .map(child => (_jsx(DrawerItemRow, { item: child, collapsed: collapsed, currentPath: currentPath, onNavigate: onNavigate, searchQuery: searchQuery, depth: depth + 1 }, child.id))) }) }))] }));
}
export function DrawerItemList({ items, collapsed, currentPath, onNavigate, searchQuery, typography }) {
    const filtered = items.filter(item => matchesSearch(item, searchQuery ?? ''));
    return (_jsx(List, { disablePadding: true, children: filtered.map(item => (_jsx(DrawerItemRow, { item: item, collapsed: collapsed, currentPath: currentPath, onNavigate: onNavigate, searchQuery: searchQuery, typography: typography }, item.id))) }));
}
