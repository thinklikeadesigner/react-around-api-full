const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');

  // verifying the token
  let payload;
  // console.log('payload', payload);

  try {
    // trying to verify the token
    // const { JWT_SECRET } = process.env;
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    // we return an error if something goes wrong
    return res
      .status(401)
      .send({ message: 'Authorization required' });
  }

  req.user = payload; // assigning the payload to the request object

  return next(); // sending the request to the next middleware
};
