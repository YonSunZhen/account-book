import React from 'react';

interface Prop {
  item?: any;
  onFormSubmit?: Function;
  onCancelSubmit?: Function;
}

interface State {

}

class PriceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  } 

  render() {
    return (
      <div>666</div>
    );
  }
}

export default PriceForm;