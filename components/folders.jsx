import {React} from '../app';
import Folder from './folder';

const Folders = ({items}) => {
  return (
    <ul className='list-group'>
      {items.map(text =>
        <Folder key={text} text={text} />)}
    </ul>
  );
};

export default Folders;
