import React, { Component } from 'react';
import MonthPicker from '../components/MonthPicker';
import {LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, padLeft} from '../utility';
import PriceList from '../components/PriceList';
import ViewTab from '../components/ViewTab';
import CreateBtn from '../components/CreateBtn';
import TotalPrice from '../components/TotalPrice';
import Day from 'dayjs';

interface Prop {

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

const categories = {
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

const items = [
  {
    id: 1,
    title: '去云南旅游',
    price: 200,
    date: '2018-09-10',
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

const newItem = {
  id: 1,
  title: '天天基金',
  price: 200,
  date: '2018-09-10',
  cid: 2
};

class Home extends Component<Prop, State> {

  constructor(props: Prop) {
    super(props);
    this.state = {
      items,
      selectedYear: String(Day().year()),
      selectedMonth: String(Day().month() + 1),
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

  onChangeView = (view) => {
    this.setState({
      tabView: view
    });
  }

  onCreateItem = () => {
    this.setState({
      items: [newItem, ...this.state.items || []]
    });
  }

  onModifyItem = (modifiedItem) => {

  }

  onDelItem = (deletedItem) => {
    const filterdItems = this.state.items?.filter(item => item.id !== deletedItem);
    this.setState({
      items: filterdItems
    });
  }

  render() {
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
          <ViewTab 
            activeTab={tabView}
            onTabChange={this.onChangeView}
          />
          <CreateBtn onClick={this.onCreateItem}></CreateBtn>
          { tabView === LIST_VIEW &&
            <PriceList 
              items={itemsWithCategroy} 
              onDeleteItem={this.onDelItem}
              onModifyItem={this.onModifyItem}
            />
          }
          { tabView === CHART_VIEW &&
            <h1>图表区域</h1>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Home;