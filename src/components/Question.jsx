import React from 'react';

const Question = props => {
  const { question, onAnswer, disabled } = props;
  const hidden = !question.resp ? 'is-hidden' : '';
  const notHidden = !question.resp ? '' : 'is-hidden';
  return (
    <div className={`question q-${question.id}`}>
      <div className="question-header">
        <div className="question-img" />
        <div className="question-text">
          <div className="ques" dangerouslySetInnerHTML={{__html: question.title}} />
          <div className="vof">¿Verdadero o Falso?</div>
        </div>
        <div className="bars">
          <div className="bar bar-1" />
          <div className="bar bar-2" />
        </div>
      </div>
      <div className="question-body">
        <div className={`answer-action ani-all ${notHidden}`}>
          <button
            className="btn btn-primary"
            onClick={() => onAnswer(true)}
            disabled={disabled}
          >
            Verdadero
          </button>
          <button
            className="btn btn-default right"
            onClick={() => onAnswer(false)}
            disabled={disabled}
          >
            Falso
          </button>
        </div>
        <div className={`answer-text ani-all ${hidden}`} dangerouslySetInnerHTML={{__html: question.resp}} />
      </div>
    </div>
  );
};

/*
question={question}
onAnswer={value => this.onAnswer(value)}
*/

export default Question;