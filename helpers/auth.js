const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const secret = process.env['JWT_SECRET']

async function validPassword(password, hash) {
    const hashVerify = await bcrypt.compare(password, hash);
    console.log(hashVerify);
  
    return hashVerify;
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

function decode(token){
    return jsonwebtoken.verify(token, secret);
}

module.exports.validPassword = validPassword;
module.exports.issueJWT = issueJWT;
module.exports.decode = decode;