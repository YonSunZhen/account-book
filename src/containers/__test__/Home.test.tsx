import { mount } from 'enzyme';
import Home, { newItem } from '../Home';
import {LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, padLeft} from '../../utility';
import PriceList from '../../components/PriceList';
import ViewTab from '../../components/ViewTab';
import MonthPicker from '../../components/MonthPicker';
import CreateBtn from '../../components/CreateBtn';
import TotalPrice from '../../components/TotalPrice';
import Day from 'dayjs';

let wrapper;

describe('test Home container component', () => {
  beforeEach(() => {
    wrapper = mount(<Home></Home>);
  });

  it('should render the default layout', () => {
    const currentYear = `${String(Day().year(2018).format('YYYY'))}`;
    const currentMonth = `${String(Day().month(8).format('M'))}`;
    expect(wrapper.find(PriceList).length).toEqual(1);
    expect(wrapper.find(ViewTab).props().activeTab).toEqual(LIST_VIEW);
    expect(wrapper.find(MonthPicker).props().year).toEqual(currentYear);
    expect(wrapper.find(MonthPicker).props().month).toEqual(currentMonth);
    expect(wrapper.find(PriceList).props().items.length).toEqual(2);
  });

  it('click the another view tab, should change the default view', () => {
    wrapper.find('.nav-item a').last().simulate('click');
    expect(wrapper.find('.chart-title').length).toEqual(1);
    expect(wrapper.find(ViewTab).props().activeTab).toEqual(CHART_VIEW);
  });

  it('click the new month item, should switch to the correct items', () => {
    wrapper.find('.dropdown-toggle').simulate('click');
    wrapper.find('.months-range .dropdown-item').at(7).simulate('click');
    expect(wrapper.find(MonthPicker).props().month).toEqual('8');
    expect(wrapper.find(PriceList).props().items.length).toEqual(1);
  });

  it('click the create button, should create the new item', () => {
    wrapper.find(CreateBtn).simulate('click');
    expect(wrapper.find(PriceList).props().items.length).toEqual(3);    
    expect(wrapper.state('items')[0]).toEqual(newItem);
  });
});

