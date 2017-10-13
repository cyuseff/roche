import React, { Component } from 'react';
import { login } from './actions';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({disabled: true});

    login(this.email.value)
      .then(token => this.props.onLogin(token))
      .catch(err => {
        console.log('err', err);
        this.setState({disabled: false})
      });
  }

  render() {
    const { disabled } = this.state;
    return (
      <form
        className="login"
        onSubmit={e => this.handleSubmit(e)}
      >
        <h1 className="margin-b">Ingresa tu Email</h1>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            ref={email => { this.email = email; }}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={disabled}>LogIn</button>
      </form>
    );
  }
}

export default LogIn;