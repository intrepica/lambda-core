import {React, Component} from '../app';
import ProgressBar from '../components/progress_bar';
import {upload} from '../services/s3';

export default class Uplaod extends Component {
  constructor(...args) {
    super(...args);
    this.state = {loading: false};
  }

  render() {
    let rendered;
    if (this.state.loading) {
      rendered = <ProgressBar
        total={this.state.total}
        loaded={this.state.loaded} />;
    } else {
      rendered = (
      <div>
        <input type='file' ref='fileChooser' />
        <button
          type='button'
          className='btn btn-default navbar-btn'
          id='upload-button'
          onClick={this._handleUpload.bind(this)}>
          Upload to S3
        </button>
      </div>);
    }
    return rendered;
  }

  _handleUpload() {    
    const fileChooser = this.refs.fileChooser;
    const file = fileChooser.files[0];
    const progress = (evt) => {
      this.setState({
        loaded: evt.loaded,
        total: evt.total,
        loading: true
      });
    };
    const finished = (err, data) => {
      if (err) {
        return console.log(err);
      }
      this.setState({
        loading: false
      });
      console.log('done', data);
    };
    upload(file, progress, finished);
  }
}
