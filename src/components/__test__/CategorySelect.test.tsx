import { shallow } from 'enzyme';
import CategorySelect from '../CategorySelect';
import Ionicon from 'react-ionicons';

export const categories = [
  {
   'id': '1',
   'name': '旅行',
   'type': 'outcome',
   'iconName': 'ios-plane',    
  },
  {
    'id': '2',
    'name': '理财',
    'type': 'income',
    'iconName': 'logo-yen', 
  },
  {
    'id': '3',
    'name': '理财',
    'type': 'income',
    'iconName': 'logo-yen', 
  }
];

const props = {
  categories,
  selectedCategory: categories[0].id,
  onSelectCategory: jest.fn()
};
let wrapper;
describe('test CategorySelect component', () => {
  beforeEach(() => {
    wrapper = shallow(<CategorySelect {...props}></CategorySelect>);
  });
  it('render the component to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('render the correct items with categories', () => {
    expect(wrapper.find('.category-item').length).toEqual(categories.length);
    expect(wrapper.find('.category-item.active').length).toEqual(1);
    const firstIcon = wrapper.find('.category-item').first().find(Ionicon);
    expect(firstIcon.length).toEqual(1);
    expect(firstIcon.props().icon).toEqual(categories[0].iconName);
  });

  it('render selectedCategory with category item with highlight', () => {
    expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(true);
  });

  it('click the item should add active class and trigger the callback', () => {
    wrapper.find('.category-item').at(1).simulate('click', { preventDefault: () => {}});
    expect(props.onSelectCategory).toHaveBeenCalledWith(categories[1]);
  });
});