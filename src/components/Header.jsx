import React from 'react';
import {QUESTION, RANKING} from './constants'

const isActive = (a, b) => a === b ? 'active' : '';

const Header = props => {
  const { user, route, onRoute, onLogout } = props;
  let render;
  if (user) {
    render = (
      <ul className="menu">
        <li className="menu-user">
          <div className="menu-email">{user.email}</div>
          <div
            onClick={() => onLogout()}
            className="menu-logout"
          >logout</div>
        </li>
        <li>
          <span
            className={`menu-btn ${isActive(QUESTION, route)}`}
            onClick={() => onRoute(QUESTION)}
          >Trivia</span>
        </li>
        <li>
          <span
            className={`menu-btn ${isActive(RANKING, route)}`}
            onClick={() => onRoute(RANKING)}
          >Ranking</span>
        </li>
      </ul>
    );
  }
  return (
    <div className="header">
      <div className="logo" />
      <div className="roche" />
      {render}
    </div>
  );
};

export default Header;