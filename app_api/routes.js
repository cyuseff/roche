const authCtrl = require('./controllers/auth');
const userCtrl = require('./controllers/user');
const qCtrl = require('./controllers/question');
const aCtrl = require('./controllers/answer');
const router = require('express').Router();

router.route('/auth')
  .post(authCtrl.login);

router.route('/me')
  .all(authCtrl.authToken)
  .get(userCtrl.getMeUser);

router.route('/user')
  .all(authCtrl.authToken)
  .get(userCtrl.getUsers);

router.route('/question')
  .all(authCtrl.authToken)
  .get(qCtrl.getQuestions);

router.route('/question/next')
  .all(authCtrl.authToken)
  .get(qCtrl.getNextQuestion);

router.route('/answer/:answerId')
  .all(authCtrl.authToken)
  .patch(aCtrl.updateAnswer);

module.exports = app => app.use('/api/v1/', router);  