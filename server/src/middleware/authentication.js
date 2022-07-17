const jwt = require('jsonwebtoken');

const isLogedIn = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(401).send('Register first');
    const token = authorization.split(' ')[1];
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verify.id;
    return next();
  } catch (err) {
    return res.status(401).send('Not Allowed');
  }
};

module.exports = isLogedIn;
