const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const sendJSON = (res, status, body) =>
  res.status(status).json(body);

const generateJwToken = data => jwt.sign(data, SECRET, {});

const decodeJwToken = jwToken =>
  new Promise((resolve, reject) => {
    jwt.verify(jwToken, SECRET, (err, decoded) => {
      if(err) {
        return reject({err: 'Token is not valid.'});
      }
      return resolve(decoded);
    });
  });

module.exports = {
  sendJSON,
  generateJwToken,
  decodeJwToken
};