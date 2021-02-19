import { RouteComponentProps } from 'react-router-dom';

export interface RouteProps extends RouteComponentProps<MatchParams> {

}

export interface MatchParams {
  id?: string;
}

export interface ItemInfo {
  title?: string;
  price?: number;
  date?: string;
  monthCategory?: string;
  id?: string;
  cid?: string;
  timestamp?: number;
}

export interface CategoryInfo {
  name?: string;
  iconName?: string;
  id?: string;
  type?: 'outcome' | 'income'
}

export interface ItemWithCategoryInfo extends ItemInfo {
  categroy?: CategoryInfo;
}