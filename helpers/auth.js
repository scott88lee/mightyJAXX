const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const secret = process.env['JWT_SECRET']

function validPassword(password, hash) {
    const hashVerify = bcrypt.hash(password, 8);
    return hash === hashVerify;
}

function issueJWT(user) {
  const _id = user._id;

  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, secret, { expiresIn: expiresIn, algorithm: 'HS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

module.exports.validPassword = validPassword;
module.exports.issueJWT = issueJWT;