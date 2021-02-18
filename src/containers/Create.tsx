import React from 'react';
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';
import Tabs, { Tab } from '../components/Tabs';
import { testCategories } from '../testData';
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility';
import withContext from '../WithContext';
import { RouterProps } from 'react-router-dom';

interface Prop extends RouterProps{

}

interface State {
  categories?: any;
}
class Create extends React.Component<Prop, State> {

  constructor(props: Prop) {
    super(props);
    this.state = {
      categories: testCategories.filter(category => category.type === TYPE_OUTCOME)
    };
  }

  onTabChange = (index) => {
    if (index === 0) {
      this.setState({
        categories: testCategories.filter(category => category.type === TYPE_OUTCOME)
      });
    } else {
      this.setState({
        categories: testCategories.filter(category => category.type === TYPE_INCOME)
      });
    }
  }

  onSelectCategoryChange = (category) => {  
  }

  onPriceFormSubmit = (data) => {
    
    
  }

  onPriceFormCancel = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className=''>
        <Tabs activeIndex={0} onTabChange={this.onTabChange}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategorySelect categories={this.state.categories} onSelectCategory={this.onSelectCategoryChange}></CategorySelect>
        <PriceForm onFormSubmit={this.onPriceFormSubmit} onCancelSubmit={this.onPriceFormCancel}></PriceForm>
      </div>
    );
  }
}

export default withContext(Create);