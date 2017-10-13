import React from 'react';
import Moment from 'react-moment';

const NextView = props => {
  const { next, next_date } = props;
  let render;

  if (next_date) {
    render = (
      <div className="next-view view-wait">
        <div className="green-bar" />
        <div className="view-wait centered-cont">
          <h1>No tienes preguntas disponibles</h1>
          <p>Vuelve más tarde y sigue paticipando</p>
          <p>Recuerda que si contestas la pregunta dentro del día, recibes un bono de <strong>20pts.</strong></p>
          <p>La próxima pregunta estará disponible <Moment fromNow locale="es">{next_date}</Moment></p>
        </div>
        <div className="green-bar" />
      </div>
    );
  } else {
    render = (
      <div className="next-view view-complete">
        <div className="green-bar" />
        <div className="centered-cont">
          <h1>Haz completado nuestra trivia!</h1>
          <p>Revisa el ranking y descubre a los ganadores.</p>
        </div>
        <div className="green-bar" />
      </div>
    )
  }
  return render;
};

export default NextView;