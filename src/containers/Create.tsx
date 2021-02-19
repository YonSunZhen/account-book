import React from 'react';
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';
import Tabs, { Tab } from '../components/Tabs';
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility';
import withContext from '../WithContext';
import { ItemInfo, RouteProps } from '../types';
import { AppActions, AppState } from '../AppContext';

interface Prop extends RouteProps{
  actions: Required<AppActions>;
  data: Required<AppState>;
  selectedCategoryId?: string;
}

interface State {
  editItem?: ItemInfo;
  selectedCategoryId?: string;
  selectedTab?: string;
}

const tabsText = [TYPE_OUTCOME, TYPE_INCOME];
class Create extends React.Component<Prop, State> {

  constructor(props: Prop) {
    super(props);  
    this.state = {
      selectedCategoryId: '',
      selectedTab: TYPE_OUTCOME
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { data } = this.props;
    const { items, categories } = data;
    const editItem = (id && items[id]) ? items[id] : {};
    this.setState({
      editItem: editItem,
      selectedTab: (id && editItem) ? categories[editItem.cid].type : TYPE_OUTCOME,
      selectedCategoryId: (id && editItem) ? categories[editItem.cid].id : '1'    
    });
  }

  onTabChange = (index) => {
    this.setState({
      selectedTab: tabsText[index]
    });
  }

  onSelectCategoryChange = (category) => {  
    this.setState({
      selectedCategoryId: category.id
    });
  }

  onPriceFormSubmit = (data, isEditMode) => {
    const _data: ItemInfo = {...data, cid: this.state.selectedCategoryId};
    if (isEditMode) {
      this.props.actions.updateItem({..._data, id: this.props.match.params.id});
    } else {
      this.props.actions.createItem(_data);
    }
    this.props.history.push('/');
  }

  onPriceFormCancel = () => {
    this.props.history.push('/');
  }

  render() {
    const { categories } = this.props.data;
    const { selectedTab = '', selectedCategoryId, editItem } = this.state;
    const filterCategories = Object.keys(categories).filter(id => categories[id].type === selectedTab).map(id => categories[id]);
    return (
      <div className=''>
        <Tabs activeIndex={tabsText.indexOf(selectedTab)} onTabChange={this.onTabChange}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategorySelect selectedCategoryId={selectedCategoryId} categories={filterCategories} onSelectCategory={this.onSelectCategoryChange}></CategorySelect>
        <PriceForm item={editItem} onFormSubmit={this.onPriceFormSubmit} onCancelSubmit={this.onPriceFormCancel}></PriceForm>
      </div>
    );
  }
}

export default withContext(Create);