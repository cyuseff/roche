const User = require('../models/user');
const Token = require('../models/token');

const { sendJSON, generateJwToken, decodeJwToken } = require('./utils');

const createToken = user => {
  const t = new Token({
    userId: user._id,
  });
  return t.save()
    .then(token => {
      const {_id, userId, createdAt} = token;
      return generateJwToken({id: _id, userId, createdAt});
    });
};

const isValidToken = (token, decoded) => {
  return token._id.toString() === decoded.id &&
  token.userId.toString() === decoded.userId &&
  token.createdAt.toISOString() === decoded.createdAt;
};

const authToken = (req, res, next) => {
  // check if header is present
  const auth = req.headers['authorization'];
  if (!auth) {
    return sendJSON(res, 401, {err: 'no authorization header'});
  }

  // malformed header
  if(!/^beared\s\w/i.test(auth)) {
    return sendJSON(res, 401, {err: 'malformed header'});
  }

  const beared = auth.replace(/^beared\s/i, '');
  
  decodeJwToken(beared)
    .then(decoded =>Token.findById(decoded.id)
      .then(token => {
        if (!token) {
          throw new Error('token not found');
        }
        if (!isValidToken(token, decoded)) {
          throw new Error('token info error');
        }
        req.userId = token.userId;
        next();
      })
    )
    .catch(err => sendJSON(res, 401, {err: err.toString()}));
};

const sanitize = str => {
  if (!str) {
    return str;
  }
  return str.trim().toLowerCase();
}

const createUser = (req, res) => {
  let {name, email} = req.body;
  name = sanitize(name);
  email = sanitize(email);
  const user = new User({name, email});

  return user
    .save()
    .then(() => {
      return createToken(user)
        .then(token => sendJSON(res, 201, {token, user: user.publicUser()}))
        .catch(err => sendJSON(res, 400, {token: null}));
    })
    .catch(err => sendJSON(res, 500, {err: err.toString()}));
};

const login = (req, res) => {
  let { email } = req.body;
  email = sanitize(email);
  console.log("email", email);
  const reg = new RegExp(email, "i");
  console.log(reg);
  User
    .findOne({email: reg})
    .exec((err, user) => {
      if (err) {
        return sendJSON(res, 500, {err: err.toString()});
      }
      if (user) {
        return createToken(user)
          .then(token => sendJSON(res, 200, {token, user: user.publicUser()}))
          .catch(err => sendJSON(res, 400, {token: null}));
      }
      return createUser(req, res);
    });
};

module.exports = {
  login,
  authToken
};