import React from 'react';
import Ionicon from 'react-ionicons';
import {LIST_VIEW, CHART_VIEW} from '../utility';

interface Prop {
  activeIndex?: number;
  onTabChange?: Function;
}

interface State {
  activeIndex?: number;
}

class Tabs extends React.Component<Prop, State> {

  constructor(props: Prop) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex
    };
  }

  tabChange = (event, index) => {
    event.preventDefault();
    this.setState({
      activeIndex: index
    });
    this.props.onTabChange && this.props.onTabChange(index);
  }

  render() {
    const { children } = this.props;
    const { activeIndex } = this.state;
    return (
      <ul className='nav nav-tabs nav-fill my-4'>
        {
          React.Children.map(children, (child, index) => {
            const activeClassName = (activeIndex === index) ? 'nav-link active' : 'nav-link';
            return (
              <li className='nav-item'>
                <a 
                  href='#' 
                  className={activeClassName} 
                  onClick={(event) => { this.tabChange(event, index);}}
                >
                  {child}
                </a>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export const Tab = ({ children }) => <React.Fragment>{children}</React.Fragment>;

export default Tabs;