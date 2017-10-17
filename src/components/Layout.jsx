import React, { Component } from 'react';
import {NAME, QUESTION, RANKING} from './constants'

import Cookie from 'js-cookie';

import Header from './Header';
import Main from './Main';
import Ranking from './Ranking';
import Footer from './Footer';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: QUESTION
    }
  }

  updateUser(user) {
    const newState = {user};
    if (!user) {
      newState.route = QUESTION;
    }
    this.setState(newState);
  }

  updateRoute(route) {
    this.setState({route});
  }

  logOut() {
    if(this.main) {
      this.main.logOut('btn logout');
    } else {
      Cookie.remove(NAME);
      this.updateUser(null);
    }
  }

  render() {
    const { user, route } = this.state;
    let render;
    switch(route){
      case QUESTION:
        render = (
          <Main
            onUser={user => this.updateUser(user)}
            ref={main => {this.main = main;}}
          />
        );
        break;
      case RANKING:
        render = (
          <Ranking
            token={Cookie.get(NAME)}
            onLogout={() => this.logOut()}
          />
        );
        break;
      default:
        render = (<div>no route</div>);
        break;
    }

    return (
      <div className="container-fluid">
        <div className="container-inner">
          <Header
            user={user}
            route={route}
            onRoute={route => this.updateRoute(route)}
            onLogout={() => this.logOut()}
          />
          {render}
          <Footer />
        </div>
      </div>
    );
  }
};

export default Layout;