import React from 'react';
import Ionicon from 'react-ionicons';
import { Colors } from '../utility';

interface Prop {
  categories?: any[],
  selectedCategory?: any,
  onSelectCategory?: Function
}

interface State {
  selectedCategory?: any
}

class CategorySelect extends React.Component<Prop, State> {
  constructor(props: Prop) {
    super(props);
    this.state = {
      selectedCategory: props[0]
    };
  }

  selectCategory = (event, category) => {
    event.preventDefault();
    this.setState({
      selectedCategory: category
    });
    this.props.onSelectCategory && this.props.onSelectCategory(category);
  }

  render() {
    const { categories } = this.props;
    const { selectedCategory } = this.state;
    const selectedCategoryId = selectedCategory?.id;
    return (
      <div className='category-select-component'>
        <div className='row'>
        {
          categories?.map((category, index) => {
            const activeClassName = (selectedCategory === category.id) ? 'category-item col-3 active' : 'category-item col-3';
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