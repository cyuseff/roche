const User = require('../models/user');
const { sendJSON } = require('./utils');

const getMeUser = (req, res) => {
  User
    .findById(req.userId)
    .then(user => {
      if (!user) {
        return sendJSON(res, 404, {err: 'not found'});
      }
      return sendJSON(res, 200, user.publicUser());
    })
    .catch(err => sendJSON(res, 500, {err: err.toString()}));
};

// TODO: create index {score: -1, totalTime: 1}
const getUsers = (req, res) => {
  User
    .find(
      {},
      {_id: 0, email: 1, name: 1, score: 1, totalTime: 1}
    )
    .sort({score: -1, totalTime: 1})
    .limit(10)
    .exec((err, users) => {
      if (err) {
        return sendJSON(res, 500, {err: err.toString()});
      }
      sendJSON(res, 200, {users});
    });
};

module.exports = {
  getMeUser,
  getUsers
};