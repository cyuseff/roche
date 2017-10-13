import React, { Component } from 'react';

import Cookie from 'js-cookie';
import { getMe } from './actions';

import Loader from './Loader';
import LogIn from './LogIn';
import Content from './Content';

import { NAME } from './constants';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      loading: true
    };
  }

  componentDidMount() {
    const token = Cookie.get(NAME);
    if (!token) {
      this.setState({loading: false});
    } else {
      this.logIn(token);
    }
  }

  logIn(token) {
    const { onUser } = this.props;
    Cookie.set(NAME, token);
    this.setState({token, loading: true});

    getMe(token)
      .then(user => {
        this.setState(
          {user, loading: false},
          () => onUser(user)
        );
      })
      .catch(err => this.logOut(err));
  }

  logOut(reason) {
    console.log('reason', reason);

    const { onUser } = this.props;
    Cookie.remove(NAME);
    this.setState(
      {user: null, token: null, loading: false},
      () => onUser(null)
    );
  }

  render() {
    const { token, loading } = this.state;

    let render;
    if (loading) {
      render = (<Loader />);
    } else {
      if (!token) {
        render = (<LogIn onLogin={token => this.logIn(token)} />);
      } else {
        render = (
          <Content
            token={token}
            logOut={() => this.logOut()}
          />
        );
      }
    }

    return (
      <div className="main">
        {render}
      </div>
    );
  }
}

export default Main;