import jwt from 'jsonwebtoken';

export const generateToken = user => {
  const { _id, name, email, isAdmin } = user;

  return jwt.sign(
    {
      _id,
      name,
      email,
      isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: '14d' },
  );
};

export const isJWTAuth = (req, res, next) => {
  // Pick token up from headers, url or body
  const authorization =
    req.get('Authorization') || req.query.token || req.body.token;

  if (!authorization)
    res.status(401).send({ message: 'No Authorization Token' });
  else {
    jwt.verify(authorization, process.env.JWT_SECRET, (err, payload) => {
      if (err) res.status(401).send({ message: 'No Authorization Token' });
      else {
        // send userId to the next middleware which probably will need it
        req.user = payload._id;
        next();
      }
    });
  }
};
