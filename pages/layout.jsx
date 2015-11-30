require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../css/main.css');

import { React, Component, Link, ui } from '../app';
import { load } from '../services/cognito';

export default class Layout extends Component {
  constructor(...args) {
    super(...args);
    this._loadCredentials();
    this.state = {identityId: null};
  }

  render() {
    let page;
    if (this.state.identityId) {
      page = this.props.children;
    } else {
      page = <div>Loading identity...</div>;
    }
    const uploadButton = {
      position: 'absolute',
      top: 20,
      right: 50,
      fontSize: 'larger'
    };
    return (
      <div>
        <div className='page-header'>
          <a href='#/'>
            <img src='images/lambda.png' />
          </a>
          <a href='#/upload'>
            <button
              type='button'
              style={uploadButton}
              className='btn btn-default navbar-btn'>
              Upload
            </button>
          </a>
          <h1>Lambda Core <small>github for lambda</small></h1>
        </div>
        <div className='panel panel-default'>
          <div className='panel-body'>
            {page}
          </div>
        </div>
      </div>
    );
  }

  _loadCredentials() {
    load((err) => {
      if (err) {
        return console.log('Error', err);
      }
      this.setState({
        identityId: AWS.config.credentials.identityId
      });
    });
  }
}
