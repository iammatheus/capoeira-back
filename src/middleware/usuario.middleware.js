const jwt = require('jsonwebtoken');

function VerifyToken(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET, (err) => {
    if (err)
      return res.status(401).json({ message: 'Token inválido.' });

    return next();
  });
}

module.exports = VerifyToken;