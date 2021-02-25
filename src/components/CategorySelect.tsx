import React from 'react';
import Ionicon from 'react-ionicons';
import { Colors } from '../utility';
import { CategoryInfo } from '../types';

interface Prop {
  categories?: CategoryInfo[],
  selectedCategoryId?: string,
  onSelectCategory?: Function
}

interface State {

}

class CategorySelect extends React.Component<Prop, State> {

  selectCategory = (event, category) => {
    event.preventDefault();
    this.props.onSelectCategory && this.props.onSelectCategory(category);
  }

  // TODO: render函数为何执行了多次
  render() {
    const { categories, selectedCategoryId } = this.props;
    return (
      <div className='category-select-component'>
        <div className='row'>
        {
          categories?.map((category, index) => {
            const activeClassName = (selectedCategoryId === category.id) ? 'category-item col-3 active' : 'category-item col-3';
            const iconColor = (category.id === selectedCategoryId) ? Colors.white : Colors.gray;
            const backColor = (category.id === selectedCategoryId) ? Colors.blue : Colors.lightGray;           
            return (
              <div 
                className={activeClassName} 
                key={index}
                role="button"
                style={{ textAlign: 'center'}}
                onClick={(event) => {this.selectCategory(event, category);}}
              >
                <Ionicon
                  className="rounded-circle"
                  style={{ backgroundColor: backColor, padding: '5px' }} 
                  fontSize="50px"
                  color={iconColor}
                  icon={category.iconName}
                />
                <p>{category.name}</p>
              </div>
            );
          })
        }
        </div>
      </div>
    );
  }
}

export default CategorySelect;