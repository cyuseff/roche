const { sendJSON } = require('./utils');
const Answer = require('../models/answer');
const User = require('../models/user');
const Question = require('../models/question');

const QUESTIONS = [
  new Question({
    id: 100,
    title: "Question001",
    description: "my",
    value: true,
    avaliableAt: new Date(2017, 9, 8)
  }),
  new Question({
    id: 101,
    title: "Question002",
    description: "my",
    value: false,
    avaliableAt: new Date(2017, 9, 11)
  })
];

const avaliableQuestions = (questions, now) =>
  questions.reduce((qs, q) => {
    if (q.avaliableAt <= now) {
      return [...qs, q];
    }
    return qs;
  }, []);

const userNextQuestion = (questions, answers) => {
  // not avaliable
  if (!questions.length) {
    return null;
  }

  for (var i = 0, l = questions.length; i < l; i++) {
    const question = questions[i];
    const answer = answers.find(a => a.questionId === question.id);

    // no answer for this question
    if(!answer) {
      return question;
    }
    // this questions had not been answered
    if(!answer.updatedAt) {
      return question;
    }
  }
  return null;
};

const getQuestions = (req, res) => {
  const questions = avaliableQuestions(QUESTIONS, new Date());
  return sendJSON(res, 200, {questions});
};

const getNextQuestion = (req, res) => {
  User
    .findById(req.userId)
    .then(user => {
      if (!user) {
        return sendJSON(res, 404, {err: 'user not found'});
      }

      const questions = avaliableQuestions(QUESTIONS, new Date());
      const next = (
        QUESTIONS.length === questions.length &&
        user.answers === questions.length
      );

      // no questions avaliable
      if(!questions.length) {
        return sendJSON(res, 200, {
          question: null,
          next,
          meta: 'no questions avaliable'
        });
      }

      const question = userNextQuestion(questions, user.answers);
      // no question avaliable
      if(!question) {
        return sendJSON(res, 200, {
          question: null,
          next,
          meta: next
            ? 'no questions avaliable for user'
            : 'user has answer all questions'
        });
      }

      // check if there is an answer
      let answer = user.answers.find(a => a.questionId === question.id);
      if (answer) {
        return sendJSON(res, 200, {
          question: question.publicQuestion(),
          next,
          meta: 'answer find for user'
        });
      }

      // create a new answer for this question
      answer = new Answer(question.id);
      user.answers.push(answer);

      user
        .save()
        .then(() => sendJSON(res, 200, {
          question: question.publicQuestion(),
          next,
          meta: 'answer created for user'
        }))
        .catch(err => sendJSON(res, 500, {err: err.toString()}));
    })
    .catch(err => sendJSON(res, 500, {err: err.toString()}));
};

module.exports = {
  QUESTIONS,
  getQuestions,
  getNextQuestion
};