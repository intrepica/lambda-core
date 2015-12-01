import {React} from '../app';

const Folder = ({text}) => {
  return (
    <a href='#' className='list-group-item'>
      <h4 className='list-group-item-heading'>{text}</h4>
      <p className='list-group-item-text'>lambda function does x</p>
    </a>
  );
};

export default Folder;
