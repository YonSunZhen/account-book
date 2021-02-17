import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './containers/Home';
import Create from './containers/Create';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='container pb-5'>
          <Route path='/' exact component={Home}></Route>
          <Route path='/create' component={Create}></Route>
          <Route path='/edit/:id' component={Create}></Route>
        </div>
      </div>

    </Router>
  );
}

export default App;
