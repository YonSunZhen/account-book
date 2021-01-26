import React from 'react';
import Ionicon from 'react-ionicons';
import {LIST_VIEW, CHART_VIEW} from '../utility';

interface ViewTabProp {
  activeTab?: string;
  onTabChange?: Function;
}

const ViewTab = ({activeTab = LIST_VIEW, onTabChange = () => {}}: ViewTabProp) => {

  const generateLinkClass = (current, view) => {
    return (current === view) ? 'nav-link active' : 'nav-link';
  };

  const onClickView = (e, view) => {
    e.preventDefault();
    onTabChange(view);
  };

  return (
    <ul className='nav nav-tabs nav-fill my-4'>
      <li className='nav-item'>
        <a className={generateLinkClass(activeTab, LIST_VIEW)} href='#' onClick={(e) => {onClickView(e, LIST_VIEW);}}>
          <Ionicon
            className='rounded-circle mr-z'
            fontSize='25px'
            color={'#007bff'}
            icon='ios-paper'
          />
          列表模式
          </a>
      </li>
      <li className='nav-item'>
        <a className={generateLinkClass(activeTab, CHART_VIEW)} href='#' onClick={(e) => {onClickView(e, CHART_VIEW);}}>
          <Ionicon
            className='rounded-circle mr-z'
            fontSize='25px'
            color={'#007bff'}
            icon='ios-pie'
          />
          图表模式
        </a>
      </li>
    </ul>
  );
};

export default ViewTab;