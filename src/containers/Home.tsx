import React, { Component } from 'react';
import MonthPicker from '../components/MonthPicker';
import {LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, padLeft} from '../utility';
import PriceList from '../components/PriceList';
import Tabs, { Tab } from '../components/Tabs';
import CreateBtn from '../components/CreateBtn';
import TotalPrice from '../components/TotalPrice';
import Day from 'dayjs';
import Ionicon from 'react-ionicons';
import withContext from '../WithContext';
import { RouterProps } from 'react-router-dom';

interface Prop extends RouterProps {
  data?: any;
}

interface State {
  items?: Item[];
  selectedYear?: string;
  selectedMonth?: string;
  tabView?: string;
}

interface Item {
  id?: number;
  title?: string;
  price?: number;
  date?: string;
  cid: number;
  categroy?: any;
}

export const categories = {
  '1': {
    name: '旅行',
    type: 'outcome',
    iconName: 'ios-plane'
  },
  '2': {
    name: '理财收入',
    type: 'income',
    iconName: 'ios-plane'
  }
};

export const items: Item[] = [
  {
    id: 1,
    title: '去云南旅游',
    price: 200,
    date: '2018-08-10',
    cid: 1
  },
  {
    id: 1,
    title: '去云南旅游',
    price: 200,
    date: '2018-09-10',
    cid: 1
  },
  {
    id: 1,
    title: '天天基金',
    price: 200,
    date: '2018-09-10',
    cid: 2
  }
];

export const newItem = {
  id: 1,
  title: '天天基金',
  price: 200,
  date: '2018-09-10',
  cid: 2
};

const tabViewList = [LIST_VIEW, CHART_VIEW];

class Home extends Component<Prop, State> {

  constructor(props: Prop) {
    super(props);
    this.state = {
      items,
      selectedYear: String(Day().year(2018).format('YYYY')),
      selectedMonth: String(Day().month(8).format('M')),
      tabView: LIST_VIEW
    };
  }

  // 必须使用箭头函数
  onChangeDate = (year, month) => {
    this.setState({
      selectedYear: year,
      selectedMonth: month
    });
  }

  onChangeView = (index) => {
    this.setState({
      tabView: tabViewList[index]
    });
  }

  onCreateItem = () => {
    this.props.history.push('/create');
  }

  onModifyItem = (modifiedItem) => {
    this.props.history.push(`/edit/${modifiedItem.id}`);
  }

  onDelItem = (deletedItem) => {
    const filterdItems = this.state.items?.filter(item => item.id !== deletedItem);
    this.setState({
      items: filterdItems
    });
  }

  render() {
    const { data } = this.props;
    const { items = [], selectedYear, selectedMonth, tabView } = this.state;
    const itemsWithCategroy = items.map(item => {
      item.categroy = categories[item.cid];
      return item;
    }).filter(item => item.date?.includes(`${selectedYear}-${padLeft(selectedMonth)}`));
    let totalIncome = 0; 
    let totalOutcome = 0;
    itemsWithCategroy.forEach(item => {
      if (item.categroy.type === TYPE_OUTCOME) {
        totalOutcome += item.price || 0;
      } else {
        totalIncome += item.price || 0;
      }
    });
    return (
      <React.Fragment>
        <div className='App-header'>
          <div className='row'>
            <div className='col'>
              <MonthPicker
                year={this.state.selectedYear}
                month={this.state.selectedMonth}
                onChange={this.onChangeDate}
              />
            </div>
            <div className='col'>
              <TotalPrice
                income={totalIncome}
                outcome={totalOutcome}
              />
            </div>
          </div>
        </div>
        <div className='content-area py3 px-3'>
          <Tabs activeIndex={0} onTabChange={this.onChangeView}>
            <Tab>
              <Ionicon
                className='rounded-circle mr-z'
                fontSize='25px'
                color={'#007bff'}
                icon='ios-paper'
              />
              列表模式
            </Tab>
            <Tab>
              <Ionicon
                className='rounded-circle mr-z'
                fontSize='25px'
                color={'#007bff'}
                icon='ios-pie'
              />
              图表模式
            </Tab>
          </Tabs>
          <CreateBtn onClick={this.onCreateItem}></CreateBtn>
          { tabView === LIST_VIEW &&
            <PriceList 
              items={itemsWithCategroy} 
              onDeleteItem={this.onDelItem}
              onModifyItem={this.onModifyItem}
            />
          }
          { tabView === CHART_VIEW &&
            <h1 className='chart-title'>图表区域</h1>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default withContext(Home);