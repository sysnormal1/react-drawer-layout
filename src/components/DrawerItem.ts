// src/components/DrawerItem.ts

import { ReactNode } from 'react';

export interface DrawerItemTypography {
  fontSize?: string | number;
  fontFamily?: string;
  fontWeight?: string | number;
  letterSpacing?: string | number;
}

export interface DrawerItem {
  id: string | number;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: DrawerItem[];
  onClick?: () => void;
}