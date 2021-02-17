import React from 'react';

interface Prop {
  item?: any;
  titleInput?: any;
  onFormSubmit?: Function;
  onCancelSubmit?: Function;
}

interface State {

}

class PriceForm extends React.Component<Prop, State> {

  dateInput;
  priceInput;
  titleInput;
  constructor(props: Prop) {
    super(props);
    this.state = {};
  }

  // TODO: 添加表单验证 
  onClickSubmit = () => {
    const title = this.titleInput.value.trim();
    const price = this.priceInput.value.trim();
    const date = this.dateInput.value.trim();
    const data = {title,price,date};
    this.props.onFormSubmit && this.props.onFormSubmit(data);
  }

  onClickCancel = () => {
    this.props.onCancelSubmit && this.props.onCancelSubmit();
  }

  render() {
    const { title, price, date } = this.props.item || {};
    return (
      <div>
        <div className="form-group">
          <label htmlFor="title">标题 *</label>
          <input 
            id="title" type="text" className="form-control" placeholder="请输入标题"
            ref={(input) => {this.titleInput = input;}}
            defaultValue={title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">价格 *</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">¥</span>
            </div>
            <input 
              id="price" type="number" className="form-control" placeholder="请输入价格"
              ref={(input) => {this.priceInput = input;}}
              defaultValue={price}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="date">日期 *</label>
          <input 
            id="date" type="date" className="form-control" placeholder="请输入标日期"
            ref={(input) => {this.dateInput = input;}}
            defaultValue={date}
          />
        </div>
        <button type="submit" className="btn btn-primary mr-3" onClick={this.onClickSubmit}>提交</button>
        <button className="btn btn-secondary" onClick={this.onClickCancel}>取消</button>
      </div>
    );
  }
}

export default PriceForm;