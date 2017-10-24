import React, { Component } from 'react';

import { getNextQuestion, answerQuestion } from './actions';

import Loader from './Loader';
import Question from './Question';
import Answer from './Answer';
import NextView from './NextView';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      next: null,
      next_date: null,
      loading: true,
      disabled: false,
      answer: null,
      bonus: null,
      user: null,
      complete: false
    }
  }

  componentDidMount() {
    this.getNextQuestion();
  }

  getNextQuestion() {
    this.setState({
      question: null,
      next: null,
      next_date: null,
      loading: true,
      disabled: false,
      answer: null,
      bonus: null,
      user: null
    }, () => {
      const { token, logOut } = this.props;
      getNextQuestion(token)
        .then(data => {
          const { question, next, meta, next_date } = data;
          if (meta === 'user has answer all questions' || meta === 'no questions avaliable') {
            this.setState({
              complete: true,
              loading: false,
              next,
              next_date
            });
          } else {
            this.setState({question, next, loading: false});
          }
        })
        .catch(err => logOut(err));
    });
  }

  onAnswer(value) {
    const { token, logOut } = this.props;
    const { question } = this.state;

    this.setState({disabled: true});

    answerQuestion(token, question.id, value)
      .then(res => {
        const { question, answer, bonus, user } = res;
        this.setState({question, answer, bonus, user});
      })
      .catch(err => logOut(err));
  }

  render() {
    const { token, logOut } = this.props;
    const {
      question,
      next,
      next_date,
      loading,
      disabled,
      answer,
      bonus,
      user,
      complete
    } = this.state;
    let render;

    if (complete) {
      return (
        <div className="content">
          <NextView next={next} next_date={next_date}/>
        </div>
      );
    }

    if (loading) {
      render = (<Loader />);
    } else {
      if (question) {
        render = (
          <div>
            <Question
              question={question}
              onAnswer={value => this.onAnswer(value)}
              disabled={disabled}
            />
           <Answer
            answer={answer}
            bonus={bonus}
            user={user}
            onNext={() => this.getNextQuestion()}
          />
          </div>
        );
      }
    }

    return (
      <div className="content">
        {render}
      </div>
    );
  }
}

// token, logOut

export default Content;