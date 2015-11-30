import {React} from '../app';

const ProgressBar = ({total, loaded}) => {
  const percentage = (parseInt(loaded) / parseInt(total)) * 100;
  const style = {
    width: percentage + '%'
  };
  return (
    <div className='progress'>
      <div
        className='progress-bar'
        role='progressbar'
        aria-valuenow='60'
        aria-valuemin='0'
        aria-valuemax='100'
        style={style}>
        <span className='sr-only'>{percentage}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressBar;
