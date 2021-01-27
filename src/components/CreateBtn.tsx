import Ionicon from 'react-ionicons';

interface CreateBtnProp {
  onClick?: Function;
}

const CreateBtn = ({ onClick = () => {} }: CreateBtnProp) => (
  <button
    className="btn btn-primary btn-block d-flex justify-content-center align-items-center" 
    onClick={(e) => {onClick();}}
  >
    <Ionicon
      className="rounded-circle" 
      fontSize="30px"
      color='#fff'
      icon='ios-add-circle'
    />
    创建一条新的记账记录
  </button>
);

export default CreateBtn;