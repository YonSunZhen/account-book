import React from 'react';
import TotalPrice from '../TotalPrice';
import { shallow } from 'enzyme';

const props = {
  income: 1000,
  outcome: 2000
};

describe('test TotalPrice component', () => {
  it('component should render correct income%outcome number', () => {
    const wrapper = shallow(<TotalPrice {...props}/>);
    expect(Number(wrapper.find('.income span').text())).toEqual(1000);
    expect(Number(wrapper.find('.outcome span').text())).toEqual(2000);
  });
});