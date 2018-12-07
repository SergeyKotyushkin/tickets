import React, {Component} from 'react'

export default class Login extends Component {
  constructor(props) {
    super();

    this.store = props.store;
    this.state = {
      email: '',
      password: ''
    }

    this.logInClickHandler = () => {
      debugger
      console.log('log in clicked', this.state, this.context.store, this.props.store);
    };

    this.onInputChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };
  }

  render() {
    return (
      <div class="flex-container">
        <div>Login</div>
        <div className="login-container">
          <div>
            <span>Email</span>
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onInputChange}/>
          </div>
          <div>
            <span>Password</span>
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onInputChange}/>
          </div>
          <div>
            <button onClick={this.logInClickHandler}>Log In</button>
          </div>
        </div>
      </div>
    );
  }
}
