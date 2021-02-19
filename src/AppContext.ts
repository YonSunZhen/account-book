import React from 'react';
import { ItemInfo, CategoryInfo } from './types';

export interface AppActions {
  deleteItem?: (arg) => void;
  createItem?: (arg: ItemInfo) => void;
  updateItem?: (arg: ItemInfo) => void;
}

export interface AppState {
  items?: ItemInfo;
  categories?: CategoryInfo;
}

export interface AppContextInfo {
  state?: AppState;
  actions?: AppActions;
}

// FIXME: createContext是用来做什么的
export const AppContext = React.createContext<AppContextInfo>({state: {}, actions: {}});