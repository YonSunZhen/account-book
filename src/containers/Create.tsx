import React from 'react';
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';
import Tabs, { Tab } from '../components/Tabs';
import { testCategories } from '../testData';
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility';

interface Prop {

}

interface State {

}
class Create extends React.Component<Prop, State> {

  onSelectCategoryChange = (category) => {  
  }

  render() {
    const filterCategories = testCategories.filter(category => category.type === TYPE_OUTCOME);
    return (
      <div className=''>
        <Tabs activeIndex={0} onTabChange={() => {}}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategorySelect categories={filterCategories} onSelectCategory={this.onSelectCategoryChange}></CategorySelect>
        <PriceForm></PriceForm>
      </div>
    );
  }
}

export default Create;