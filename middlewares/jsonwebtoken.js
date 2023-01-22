const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    jwtSecret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        response: 'error',
        message: 'Missing token',
      });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;
    if (req.params.id && req.params.id !== id) {
      throw new Error('Invalid user ID');
    } else {
      next();
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
        return res.status(400).json({
            response: 'error',
            message: 'Token expired',
        });
    }
    return res.status(400).json({
        response: 'error',
        message: error.message,

    });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};