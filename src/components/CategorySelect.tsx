import React from 'react';
import Ionicon from 'react-ionicons';

interface Prop {
  categories?: any[],
  selectedCategory?: any,
  onSelectCategory?: Function
}

interface State {

}

class CategorySelect extends React.Component<Prop, State> {
  constructor(props: Prop) {
    super(props);
    this.state = {

    };
  }

  selectCategory = (event, category) => {
    event.preventDefault();
    this.props.onSelectCategory && this.props.onSelectCategory(category);
  }

  render() {
    const { categories, selectedCategory } = this.props;
    return (
      <div className='category-select-component'>
        <div className='row'>
        {
          categories?.map((category, index) => {
            const activeClassName = (selectedCategory === category.id) ? 'category-item col-3 active' : 'category-item col-3';            
            return (
              <div className={activeClassName} onClick={(event) => {this.selectCategory(event, category);}}>
                <Ionicon 
                  icon={category.iconName}
                />
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