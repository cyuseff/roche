import React, { Component } from 'react';
import { getRanking, formatSeconds } from './actions';
import Loader from './Loader';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      loading: true
    };
  }

  componentDidMount() {
    this.fetchRanking();
  }

  fetchRanking() {
    const { token, onLogout } = this.props;
    this.setState({users: null, loading: true});
    getRanking(token)
      .then(({users}) => this.setState({users, loading: false}))
      .catch(err => console.log(err));
  }

  renderLi() {
    const { users } = this.state;
    return users.map((u, idx) => (
      <tr key={u.email}>
        <th scope="row">{idx+1}</th>
        <td>{u.email}</td>
        <td className="text-center">{u.score}</td>
        <td className="text-center">{formatSeconds(u.totalTime)}</td>
      </tr>
    ));
  }

  render() {
    const { loading } = this.state;
    let render;
    if (loading) {
      render = (<Loader />);
    } else {
      render = (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Nº</th>
              <th>Email</th>
              <th className="text-center">Puntaje</th>
              <th className="text-center">Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {this.renderLi()}
          </tbody>
        </table>
      );
    }
    return (
      <div>
        <div className="green-bar" />
        <div className="ranking centered-cont">
          <div className="text-center">
            <div className="ranking-logo" />
          </div>
          <h1 className="title">Ranking</h1>
          {render}
        </div>
        <div className="green-bar" />
      </div>
    );
  }
}

export default Ranking;