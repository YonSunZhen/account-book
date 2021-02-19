import React from 'react';
import Ionicon from 'react-ionicons';

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
      // activeIndex: props.activeIndex, // FIXME: 这样赋值无法获取到值
      activeIndex: 0
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
    const { children, activeIndex } = this.props;
    // const { activeIndex } = this.state; // FIXME: 为什么这样取不到值
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