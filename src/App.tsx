import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './containers/Home';
import Create from './containers/Create';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { flatternArr, genID, parseToYearAndMonth } from './utility';
import { AppContext, AppActions, AppState } from './AppContext';
import { getCategories, getItems, delItem, createItem, updateItem } from './api';
import Day from 'dayjs';
import { ItemInfo } from './types';

interface Prop {

}

interface State extends AppState {
  
}

class App extends React.Component<Prop, State> {

  withLoading = (cb) => {
    return (...args) => {
      this.setState({
        isLoading: true
      });
      return cb(...args);
    };
  }

  actions: AppActions = {
    selectNewMonth: this.withLoading(async (year, month) => {
      const items = await this._getItems(year, month);
      this.setState({
        isLoading: false,
        items: items,
        selectedYear: year,
        selectedMonth: month
      });
    }),
    deleteItem: this.withLoading(async (item: ItemInfo) => {
      const deleteItem = await delItem(item.id);
      if (deleteItem.status === 200) {
        const items = await this._getItems();
        this.setState({
          isLoading: false,
          items: items
        });
      }
    }),
    createItem: this.withLoading(async (data) => {
      const newId = genID();
      const parsedDate = parseToYearAndMonth(data.date);
      data.monthCategory = `${parsedDate.year}-${parsedDate.month}`;
      data.timestamp = new Date(data.date as string).getTime();
      const newItem = {...data, id: newId};
      const addRes = await createItem(newItem);
      if (addRes.status === 201) {
        const _item = await this._getItems();
        this.setState({
          isLoading: false,
          items: _item
        });
      }
    }),
    updateItem: this.withLoading(async (data: ItemInfo) => {
      const _date = new Date(data.date as string);      
      const modifedItem: ItemInfo = {
        ...data,
        timestamp: _date.getTime(),
        monthCategory: `${_date.getFullYear()}-${_date.getMonth() + 1}`
      };
      const updateRes = await updateItem(modifedItem.id as string, modifedItem);
      if (updateRes.status === 200) {
        const _item = await this._getItems();
        this.setState({
          isLoading: false,
          items: _item
        });
      }
    })
  };
  constructor(props: Prop) {
    super(props);
    this.state = {
      selectedYear: String(Day().year(2018).format('YYYY')),
      selectedMonth: String(Day().month(10).format('M')),
    };
  }

  componentDidMount = this.withLoading(async () => {
    console.log('app componentDidMount');
    this.setState({
      isLoading: true
    });
    const initalData = await this._getInitalData();    
    this.setState({
      items: initalData.items,
      categories: flatternArr(initalData.categories),
      isLoading: false
    });
  })

  _getInitalData = async () => {
    const categories = await getCategories();
    const items = await this._getItems();
    return {items, categories};
  }

  _getItems = async (year = this.state.selectedYear, month = this.state.selectedMonth) => {
    const _item = await getItems(`${year}-${month}`);
    return flatternArr(_item);
  }
  
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        <Router>
          <div className='App'>
            <div className='container pb-5'>
              <Route path='/' exact component={Home}></Route>
              <Route path='/create' component={Create}></Route>
              <Route path='/edit/:id' component={Create}></Route>
            </div>
          </div>
        </Router>
      </AppContext.Provider> 
    );
  }
}

export default App;
