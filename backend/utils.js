import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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

  if (!authorization) {
    res.status(401).send({ message: 'Sin token de autorización' });
  } else {
    jwt.verify(authorization, process.env.JWT_SECRET, (err, payload) => {
      if (err) res.status(401).send({ message: 'Token no autorizado' });
      else {
        // send userId to the next middleware which probably will need it
        // FIXME: [KPF-230] Send userID as user makes confusion! Fix is only change next line by req.userId = payload._id;
        req.user = payload._id;
        next();
      }
    });
  }
};

// get SERVER_URL //FIXME: Not used yet
export const getServerUrl = () => {
  const port = process.env.SERVER_PORT || 5000;
  const dev = process.env.NODE_ENV !== 'production';
  const SERVER_URL = dev
    ? `http://localhost:${port}`
    : 'https://mariscoslaparada.es';
  return SERVER_URL;
};

export const hashPass = plainPass => {
  return bcrypt.hashSync(plainPass, 5);
};

// export const isCorrectPass = plainPass => {
//   return bcrypt.compare(plainPass, _____);
// };
