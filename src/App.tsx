import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './containers/Home';
import Create from './containers/Create';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { testCategories, testItems } from './testData';
import { flatternArr, genID, parseToYearAndMonth } from './utility';
import { AppContext, AppActions, AppState } from './AppContext';

interface Prop {

}

interface State extends Required<AppState> {

}

class App extends React.Component<Prop, State> {

  actions: AppActions = {
    deleteItem: (item) => {
      this.state.items && delete this.state.items[item.id];
      this.setState({
        items: this.state.items
      });
    },
    createItem: (data) => {
      const newId = genID();
      const parsedDate = parseToYearAndMonth(data.date);
      data.monthCategory = `${parsedDate.year}-${parsedDate.month}`;
      data.timestamp = new Date(data.date as string).getTime();
      const newItem = {...data, id: newId};
      this.setState({
        items: {...this.state.items, [newId]: newItem}
      });
    },
    updateItem: (data) => {
      const modifedItem = {
        ...data
      };
      this.setState({
        items: {...this.state.items, [modifedItem.id as string]: modifedItem}
      });
      
    }
  };
  constructor(props: Prop) {
    super(props);
    this.state = {
      items: flatternArr(testItems),
      categories: flatternArr(testCategories)
    };
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
