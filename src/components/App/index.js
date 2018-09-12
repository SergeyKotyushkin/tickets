import React, {Component} from 'react';

import Home from 'components/Home';
import Login from 'components/Login';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>App</div>
        <hr/>
        <div>
          <Home/>
          <hr/>
          <Login/>
        </div>
      </div>
    );
  };
}
