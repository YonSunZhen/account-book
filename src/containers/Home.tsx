import React, { Component } from 'react';
import MonthPicker from '../components/MonthPicker';
import {LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, padLeft} from '../utility';
import PriceList from '../components/PriceList';
import Tabs, { Tab } from '../components/Tabs';
import CreateBtn from '../components/CreateBtn';
import TotalPrice from '../components/TotalPrice';
import Ionicon from 'react-ionicons';
import withContext from '../WithContext';
import { RouteProps } from '../types';
import { AppActions, AppState } from '../AppContext';
import Loader from '../components/Loader';

interface Prop extends RouteProps {
  data: Required<AppState>;
  actions: Required<AppActions>;
}

interface State {
  tabView?: string;
}

const tabViewList = [LIST_VIEW, CHART_VIEW];

class Home extends Component<Prop, State> {

  constructor(props: Prop) {
    super(props);
    this.state = {
      tabView: LIST_VIEW
    };
  }

  // 必须使用箭头函数
  onChangeDate = async (year, month) => {
    await this.props.actions.selectNewMonth(year, month);
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
    const { tabView } = this.state;
    const { items = [], categories, selectedYear, selectedMonth, isLoading } = this.props.data;
    const itemsWithCategroy = Object.keys(items).map(id => {
      items[id].categroy = categories[items[id].cid];
      return items[id];
    });
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
                year={selectedYear}
                month={selectedMonth}
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
          { isLoading &&
            <Loader></Loader>
          }
          { !isLoading &&
            <React.Fragment>
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
            </React.Fragment>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default withContext(Home);