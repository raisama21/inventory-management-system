const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
    if (error) return res.sendStatus(403);
    req.user = decoded;

    next();
  });
};

module.exports = verifyJWT;
