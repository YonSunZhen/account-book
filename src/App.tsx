import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LIST_VIEW, CHART_VIEW} from './utility';
import PriceList from './components/PriceList';
import ViewTab from './components/ViewTab';
import MonthPicker from './components/MonthPicker';

const items = [
  {
    id: 1,
    title: '去云南旅游',
    price: 200,
    date: '2018-09-10',
    category: {
      id: 1,
      name: '旅行',
      type: 'outcome',
      iconName: 'ios-plane'
    }
  },
  {
    id: 1,
    title: '去云南旅游',
    price: 200,
    date: '2018-09-10',
    category: {
      id: 1,
      name: '旅行',
      type: 'outcome',
      iconName: 'ios-plane'
    }
  }
]

function App() {
  return (
    <div>
      {/* <PriceList 
        items={items} 
        onDeleteItem={(item) => {console.log(item.id);}}
        onModifyItem={(item) => {console.log(item.id);}}
      /> */}
      {/* <ViewTab 
        activeTab={CHART_VIEW}
        onTabChange={(view) => {console.log(view);}}
        /> */}
      <MonthPicker 
        year={2021}
        month={1}
        onChange={(year, month) => {console.log(year, month);
        }}
        />
    </div>
  );
}

export default App;
