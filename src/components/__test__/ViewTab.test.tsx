import ViewTab from '../ViewTab';
import {LIST_VIEW, CHART_VIEW} from '../../utility';
import { shallow } from 'enzyme';

const props = {
  activeTab: LIST_VIEW,
  onTabChange: jest.fn()
};
let wrapper;
describe('test ViewTab component', () => {
  beforeEach(() => {
    wrapper = shallow(<ViewTab {...props}></ViewTab>);
  });

  it('should render correct tab for initial tab', () => {
    expect(wrapper.find('a').first().hasClass('active')).toEqual(true);
  });

  // it('should trigger the correct function callbacks', () => {
  //   const _listView = wrapper.find('.nav-link').first();
  //   _listView.simulate('click');
  //   expect(props.onTabChange).toHaveBeenCalled(); // TODO: 
  // });
});

