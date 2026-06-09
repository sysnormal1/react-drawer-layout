// src/components/DrawerItem.ts

import { ReactNode } from 'react';

export interface DrawerItem {
  id: string | number;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: DrawerItem[];
  onClick?: () => void;
}