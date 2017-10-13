const { sendJSON } = require('./utils');
const Answer = require('../models/answer');
const User = require('../models/user');
const { QUESTIONS } = require('./question');

const POINTS = 100;
const BONUS = 10;

// checks if 2 dates are on the same day
const addBonus = (a, b) => {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
};

// return the diff between 2 times in seconds
const calcTime = (a, b) => {
  const m0 = Date.parse(a.toString());
  const m1 = Date.parse(b.toString());
  if (isNaN(m0) || isNaN(m1)) {
    return null;
  }
  return Math.round(Math.abs(m1 - m0) / 1000);
};

// return the updated score and time
const getTotalScoreAndTime = answers =>
  answers.reduce((r, a) => {
    const { points, time } = a;
    const score = r.score + points;
    const totalTime = r.totalTime + time;
    return {score, totalTime};
  }, {score: 0, totalTime: 0});

const updateAnswer = (req, res) => {
  const answerId = parseInt(req.params.answerId, 10);
  if (isNaN(answerId)) {
    return sendJSON(res, 400, {err: 'answerId err'});
  }

  const { value } = req.body;
  if (value === undefined) {
    return sendJSON(res, 409, {err: 'value is required'});
  }
  if (typeof value !== "boolean") {
    return sendJSON(res, 409, {err: 'value type error'});
  }

  User
    .findById(req.userId)
    .then(user => {
      if (!user) {
        return sendJSON(res, 404, {err: 'user not found'});
      }

      const answers = [...user.answers];
      const answer = answers.find(a => a.questionId === answerId);
      if (!answer) {
        return sendJSON(res, 404, {err: 'answer not found in user'});
      }
      if (answer.updatedAt) {
        return sendJSON(res, 400, {err: 'answer already updated'});
      }

      const question = QUESTIONS.find(q => q.id === answerId);
      if (!question) {
        return sendJSON(res, 404, {err: 'question not found'});
      }

      // update answer
      const now = new Date();
      answer.value = value;
      answer.updatedAt = now;

      let bonus = false;
      if(value === question.value) {
        answer.correct = true;
        answer.points = POINTS;

        bonus = addBonus(now, question.avaliableAt);
        if (bonus) {
          answer.points += BONUS;
        }
      } else {
        answer.correct = false;
        answer.points = 0;
      }

      // calc how much time the user took to answer
      answer.time = calcTime(now, answer.createdAt);
      if (answer.time === null) {
        return sendJSON(res, 500, {err: 'couldn\'t set time'});
      }

      // update user
      const { score, totalTime } = getTotalScoreAndTime(answers);

      User
        .findOneAndUpdate(
          {_id: req.userId},
          {answers, score, totalTime},
          {new: true},
          (err, u) => {
            if (err) {
              return sendJSON(res, 500, {err: `error updating user - ${err.toString()}`})
            }
            sendJSON(res, 200, {answer, bonus, user: u.publicUser(), question: question.getAnswer()})
          }
        );
    })
    .catch(err => sendJSON(res, 500, {err: err.toString()}));

};

module.exports = {updateAnswer};