import React from 'react';

const Answer = props => {
  const { answer, bonus, user, onNext } = props;
  if (!answer) {
    return <div></div>;
  }

  let msg = 'Repuesta correcta';
  let error = '';
  if (!answer.correct) {
    msg = 'Repuesta incorrecta';
    error = 'error';
  }

  let b;
  if (bonus) {
    b = (
      <div className="bono">
        <div className="bono-p">+20</div>
        <div className="bono-t">bono del día</div>
      </div>
    );
  }

  return (
    <div className={`answer ${error}`}>
      <div className="points">
        {b}
        <div className="number">{answer.points}</div>
        <div className="text">pts</div>
      </div>
      <div className="resume">
        <div className="response">{msg}</div>
        <div className="user-email">{user.email}</div>
        <div className="user-points">Llevas {user.score}pts. en total</div>
      </div>
      <button
        className="btn btn-primary margin-t"
        onClick={e => {
          e.preventDefault();
          onNext();
        }}
      >Siguiente</button>
    </div>
  );
};

export default Answer;