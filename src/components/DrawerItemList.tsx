// src/components/DrawerItemList.tsx

import { useState, useCallback } from 'react';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { DrawerItem, DrawerItemTypography } from './DrawerItem.js';

interface DrawerItemListProps {
  items: DrawerItem[];
  collapsed?: boolean;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  searchQuery?: string;
  typography?: DrawerItemTypography;
}

function matchesSearch(item: DrawerItem, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  if (item.label.toLowerCase().includes(q)) return true;
  if (item.children?.some(child => matchesSearch(child, query))) return true;
  return false;
}

function DrawerItemRow({
  item,
  collapsed,
  currentPath,
  onNavigate,
  searchQuery,
  depth = 0,
  typography,
}: {
  item: DrawerItem;
  collapsed?: boolean;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  searchQuery?: string;
  depth?: number;
  typography?: DrawerItemTypography;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!item.children?.length;
  const isActive = !!item.path && currentPath?.startsWith(item.path);

  const handleClick = useCallback(() => {
    if (hasChildren) {
      setOpen(prev => !prev);
    } else if (item.path) {
      onNavigate?.(item.path);
    } else {
      item.onClick?.();
    }
  }, [hasChildren, item, onNavigate]);

  const button = (
    <ListItemButton
      onClick={handleClick}
      selected={isActive}
      sx={{ pl: 2 + depth * 2 }}
    >
      {item.icon && (
        <ListItemIcon
          sx={{
            minWidth: collapsed && depth === 0 ? 'unset' : 40, // ← era 36, aumentar para 40
            mr: collapsed ? 0 : 1, // ← gap entre ícone e texto
          }}
        >
          {item.icon}
        </ListItemIcon>
      )}
      {!collapsed && (
        <>
          <ListItemText
            primary={item.label}
            slotProps={{
              primary: {
                sx: {
                  fontSize: typography?.fontSize ?? '0.825rem',
                  fontFamily: typography?.fontFamily,
                  fontWeight: typography?.fontWeight ?? 500,
                  letterSpacing: typography?.letterSpacing ?? '0.02em',
                }
              }
            }}
          />
          {hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
        </>
      )}
    </ListItemButton>
  );

  return (
    <>
      {collapsed && depth === 0 ? (
        <Tooltip title={item.label} placement="right">
          {button}
        </Tooltip>
      ) : (
        button
      )}

      {hasChildren && !collapsed && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children!
              .filter(child => matchesSearch(child, searchQuery ?? ''))
              .map(child => (
                <DrawerItemRow
                  key={child.id}
                  item={child}
                  collapsed={collapsed}
                  currentPath={currentPath}
                  onNavigate={onNavigate}
                  searchQuery={searchQuery}
                  depth={depth + 1}
                />
              ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export function DrawerItemList({
  items,
  collapsed,
  currentPath,
  onNavigate,
  searchQuery,
  typography
}: DrawerItemListProps) {
  const filtered = items.filter(item => matchesSearch(item, searchQuery ?? ''));

  return (
    <List disablePadding>
      {filtered.map(item => (
        <DrawerItemRow
          key={item.id}
          item={item}
          collapsed={collapsed}
          currentPath={currentPath}
          onNavigate={onNavigate}
          searchQuery={searchQuery}
          typography={typography}
        />
      ))}
    </List>
  );
}