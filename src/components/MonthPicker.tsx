import React from 'react';
import { padLeft, range } from '../utility'

interface MonthPickerProp {
  year?: number;
  month?: number;
  onChange?: Function;
}

class MonthPicker extends React.Component {

  props: MonthPickerProp = {};
  state: any;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggleDropdown = (event) => {
    event.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen,
      selectedYear: this.props.year,
      selectedMonth: this.props.month
    })
  }

  selectYear = (event, yearNumber) => {
    event.preventDefault();
    this.setState({
      selectedYear: yearNumber,
      selectedMonth: null
    })
  }

  selectMonth = (event, monthNumber) => {
    event.preventDefault();
    this.setState({
      selectedMonth: monthNumber,
      isOpen: false
    })
    this.props.onChange && this.props.onChange(this.state.selectedYear, monthNumber);
  }

  render() {
    const { year = 0, month = 0 } = this.props;
    const { isOpen, selectedYear, selectedMonth } = this.state;
    const monthRange = range(12, 1);
    const yearRange = range(9, -4).map(number => number + year);
    return (
      <div className='dropdown month-picker-component'>
        <h4>选择月份</h4>
        <button 
          className='btn btn-lg btn-secondary dropdown-toggle'
          onClick={this.toggleDropdown}
        >
          {`${year}年 ${padLeft(month)}月`}
        </button>
        {/* 小技巧 */}
        { isOpen &&
          <div className='dropdown-menu' style={{display: 'block'}}>
            <div className='row'>
              <div className='col border-right'>
                {yearRange.map((yearNumber, index) => 
                  <a key={index} 
                    href='#'
                    onClick={(e) => {this.selectYear(e, yearNumber)}}
                    className={(yearNumber === selectedYear) ? 'dropdown-item active' : 'dropdown-item'}>
                    {yearNumber} 年
                  </a>
                )}
              </div>
              <div className='col'>
                {monthRange.map((monthNumber, index) => 
                  <a key={index} 
                    href='#'
                    onClick={(e) => {this.selectMonth(e, monthNumber)}}
                    className={(monthNumber === selectedMonth) ? 'dropdown-item active' : 'dropdown-item'}>
                    {padLeft(monthNumber)} 月
                  </a>
                )}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default MonthPicker;