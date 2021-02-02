import { shallow } from 'enzyme';
import PriceList from '../PriceList';
import Ionicon from 'react-ionicons';
import { items, categories } from '../../containers/Home';

const itemsWithCategroy = items.map(item => {
  item.categroy = categories[item.cid];
  return item;
});

const props = {
  items: itemsWithCategroy,
  onModifyItem: jest.fn(),
  onDeleteItem: jest.fn()
};
let wrapper;
describe('test PriceList component', () => {
  beforeEach(() => {
    wrapper = shallow(<PriceList {...props}></PriceList>);
  });

  it('should render the component to match snapshots', () => {
    expect(wrapper).toMatchSnapshot(); // FIXME: 不生效
  });

  it('should render correct price items length', () => {
    expect(wrapper.find('.list-group-item').length).toEqual(itemsWithCategroy.length);
  });

  it('should render correct icon and price for each item', () => {
    const iconList = wrapper.find('.list-group-item').first().find(Ionicon);
    expect(iconList.length).toEqual(3);
    // expect(iconList.first().props().icon).toEqual(itemsWithCategroy[0].categroy.iconName);
  });

  it('should trigger the correct function callbacks', () => {
    const firstItem = wrapper.find('.list-group-item').first();
    firstItem.find('a').first().simulate('click'); // 模拟点击事件
    expect(props.onModifyItem).toHaveBeenCalledWith(itemsWithCategroy[0]); // 触发事件响应
    firstItem.find('a').last().simulate('click');
    expect(props.onDeleteItem).toHaveBeenCalledWith(itemsWithCategroy[0]);
  });
});