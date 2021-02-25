import React from 'react';
import { ItemInfo, CategoryInfo } from './types';

export interface AppActions {
  selectNewMonth?: (year, month) => void;
  deleteItem?: (arg) => void;
  createItem?: (arg: ItemInfo) => Promise<any>;
  updateItem?: (arg: ItemInfo) => void;
}

export interface AppState {
  categories?: { [key: string]: CategoryInfo };
  items?: { [key: string]: ItemInfo };
  isLoading?: boolean;
  selectedYear?: string;
  selectedMonth?: string;
}

export interface AppContextInfo {
  state?: AppState;
  actions?: AppActions;
}

// FIXME: createContext是用来做什么的
export const AppContext = React.createContext<AppContextInfo>({state: {}, actions: {}});