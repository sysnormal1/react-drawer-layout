// src/components/DrawerItem.ts

import { ReactNode } from 'react';

export interface DrawerItemTypography {
  fontSize?: string | number;
  fontFamily?: string;
  fontWeight?: string | number;
  letterSpacing?: string | number;
}

/**
 * A aparência de um item do menu. Todo campo é opcional: o que faltar fica como o MUI
 * (ou a `typography`) desenha.
 */
export interface DrawerItemLook extends DrawerItemTypography {
  /** Cor do texto e do ícone. */
  color?: string;
  /** Fundo da linha. No item selecionado, substitui o destaque padrão do MUI. */
  backgroundColor?: string;
  /** Intensidade: opacidade do texto e do ícone, de 0 a 1. */
  opacity?: number;
  underline?: boolean;
  /** Cor do sublinhado; ausente = a cor do texto. */
  underlineColor?: string;
}

/**
 * Aparência do menu, em camadas que se somam nesta ordem: `typography` (legado) →
 * `item` → `child` (só nos itens aninhados) → `selected` (só no item da rota atual).
 */
export interface DrawerAppearance {
  /** Todo item. */
  item?: DrawerItemLook;
  /** Itens aninhados (filhos), por cima de `item`. */
  child?: DrawerItemLook;
  /** O item da rota atual, por cima dos anteriores. */
  selected?: DrawerItemLook;
  /** Recuo por nível de aninhamento, em px. Padrão: 16. */
  indent?: number;
}

export interface DrawerItem {
  id: string | number;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: DrawerItem[];
  onClick?: () => void;
}
