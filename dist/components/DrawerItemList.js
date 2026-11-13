import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/DrawerItemList.tsx
import { useState, useCallback } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
/** Recuo por nível quando a aparência não diz outro (o `pl: 2 + depth * 2` de antes). */
const DEFAULT_INDENT = 16;
const BASE_PADDING = 16;
/**
 * O item é o da rota atual? Igual, ou a rota está DENTRO dele (`/a` marca `/a/b`). Antes
 * era só `startsWith`: o `/` do "Início" casava com tudo e ficava sempre marcado, e `/a`
 * marcava também `/abc`.
 */
function isPathActive(path, currentPath) {
    if (!currentPath)
        return false;
    if (path === '/')
        return currentPath === '/';
    const base = path.endsWith('/') ? path.slice(0, -1) : path;
    return currentPath === base || currentPath.startsWith(base + '/');
}
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
/** Junta as camadas sem deixar um `undefined` de cima apagar o valor de baixo. */
function mergeLooks(...looks) {
    const result = {};
    for (const look of looks) {
        if (!look)
            continue;
        for (const [key, value] of Object.entries(look)) {
            if (value !== undefined && value !== '')
                result[key] = value;
        }
    }
    return result;
}
function DrawerItemRow({ item, collapsed, currentPath, onNavigate, searchQuery, depth = 0, typography, appearance, }) {
    const [open, setOpen] = useState(false);
    const hasChildren = !!item.children?.length;
    const isActive = !!item.path && isPathActive(item.path, currentPath);
    const handleClick = useCallback(() => {
        if (hasChildren) {
            setOpen(prev => !prev);
        }
        if (item.path) {
            onNavigate?.(item.path);
        }
        item.onClick?.();
    }, [hasChildren, item, onNavigate]);
    const look = mergeLooks({ fontSize: '0.825rem', fontWeight: 500, letterSpacing: '0.02em' }, typography, appearance?.item, depth > 0 ? appearance?.child : undefined, isActive ? appearance?.selected : undefined);
    const indent = appearance?.indent ?? DEFAULT_INDENT;
    const background = look.backgroundColor;
    const button = (_jsxs(ListItemButton, { onClick: handleClick, selected: isActive, sx: {
            pl: `${BASE_PADDING + depth * indent}px`,
            ...(background && {
                backgroundColor: background,
                '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: background },
            }),
        }, children: [item.icon && (_jsx(ListItemIcon, { sx: {
                    minWidth: collapsed && depth === 0 ? 'unset' : 40,
                    mr: collapsed ? 0 : 1, // gap entre ícone e texto
                    ...(look.color && { color: look.color }),
                    ...(look.opacity !== undefined && { opacity: look.opacity }),
                }, children: item.icon })), !collapsed && (_jsxs(_Fragment, { children: [_jsx(ListItemText, { primary: item.label, slotProps: {
                            primary: {
                                sx: {
                                    fontSize: look.fontSize,
                                    fontFamily: look.fontFamily,
                                    fontWeight: look.fontWeight,
                                    letterSpacing: look.letterSpacing,
                                    ...(look.color && { color: look.color }),
                                    ...(look.opacity !== undefined && { opacity: look.opacity }),
                                    ...(look.underline && {
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '3px',
                                        ...(look.underlineColor && { textDecorationColor: look.underlineColor }),
                                    }),
                                }
                            }
                        } }), hasChildren && (open ? _jsx(ExpandLess, {}) : _jsx(ExpandMore, {}))] }))] }));
    return (_jsxs(_Fragment, { children: [collapsed && depth === 0 ? (_jsx(Tooltip, { title: item.label, placement: "right", children: button })) : (button), hasChildren && !collapsed && (_jsx(Collapse, { in: open, timeout: "auto", unmountOnExit: true, children: _jsx(List, { disablePadding: true, children: item.children
                        .filter(child => matchesSearch(child, searchQuery ?? ''))
                        .map(child => (_jsx(DrawerItemRow, { item: child, collapsed: collapsed, currentPath: currentPath, onNavigate: onNavigate, searchQuery: searchQuery, depth: depth + 1, 
                        /* Os filhos recebiam só a navegação: a tipografia não descia e eles
                           voltavam ao tamanho padrão da biblioteca. */
                        typography: typography, appearance: appearance }, child.id))) }) }))] }));
}
export function DrawerItemList({ items, collapsed, currentPath, onNavigate, searchQuery, typography, appearance }) {
    const filtered = items.filter(item => matchesSearch(item, searchQuery ?? ''));
    return (_jsx(List, { disablePadding: true, children: filtered.map(item => (_jsx(DrawerItemRow, { item: item, collapsed: collapsed, currentPath: currentPath, onNavigate: onNavigate, searchQuery: searchQuery, typography: typography, appearance: appearance }, item.id))) }));
}
