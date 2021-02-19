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
import { RouteProps } from '../types';
import { AppActions, AppState } from '../AppContext';

interface Prop extends RouteProps {
  data: Required<AppState>;
  actions: Required<AppActions>;
}

interface State {
  selectedYear?: string;
  selectedMonth?: string;
  tabView?: string;
}

const tabViewList = [LIST_VIEW, CHART_VIEW];

class Home extends Component<Prop, State> {

  constructor(props: Prop) {
    super(props);
    this.state = {
      selectedYear: String(Day().year(2018).format('YYYY')),
      selectedMonth: String(Day().month(7).format('M')),
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
    this.props.actions.deleteItem(deletedItem);
  }

  render() {
    const { selectedYear, selectedMonth, tabView } = this.state;
    const { items = [], categories } = this.props.data;
    const itemsWithCategroy = Object.keys(items).map(id => {
      items[id].categroy = categories[items[id].cid];
      return items[id];
    }).filter(item => item.date?.includes(`${selectedYear}-${padLeft(selectedMonth)}`));
    let totalIncome = 0; 
    let totalOutcome = 0;
    itemsWithCategroy.forEach(item => {
      if (item.categroy?.type === TYPE_OUTCOME) {
        totalOutcome += Number(item.price) || 0;
      } else if (item.categroy?.type === TYPE_INCOME) {
        totalIncome += Number(item.price) || 0;
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