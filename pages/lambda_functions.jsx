import {React, Component} from '../app';
import Folders from '../components/folders';
import {listObjects} from '../services/s3';

export default class LambdaFunctions extends Component {
  constructor(...args) {
    super(...args);
    this._loadFunctions();
    this.state = {modules: []};
  }

  render() {
    let modules;
    if (this.state.modules) {
      modules = <Folders items={this.state.modules} />;
    } else {
      modules = <div>Loading folders...</div>;
    }
    return (
      <div>{modules}</div>
    );
  }

  _loadFunctions() {
    listObjects((err, modules) => {
      if (err) {
        return console.log('Error', err);
      }
      this.setState({
        modules: modules
      });
    });
  }
}
