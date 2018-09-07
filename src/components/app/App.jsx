import React, {Component} from 'react';
import Home from 'components/home/Home.jsx';

export default class App extends Component {
  render() {
    return (<div>
      <div>App</div>
      <hr/>
      <div>
        <div>
          <Home/>
        </div>
      </div>
    </div>);
  };
}
