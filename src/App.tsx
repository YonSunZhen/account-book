import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './containers/Home';
import Create from './containers/Create';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { testCategories, testItems } from './testData';
import { flatternArr } from './utility';
import { AppContext } from './AppContext';

interface Prop {

}

interface State {
  items?: any;
  categories?: any;
}
// FIXME: createContext是用来做什么的
// export const AppContext = React.createContext({state: {}});
class App extends React.Component<Prop, State> {

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
        state: this.state
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
