const jwt = require('jsonwebtoken');
const { HttpError } = require('./httpError');


/**
 * 
 * @type {import("express").RequestHandler}
 */
exports.requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const accessToken = authHeader.split(' ')[1];
      jwt.verify(accessToken, process.env.JWT_SECRET, (error, authUserPayload) => {
        if (error) {
          return next(new HttpError(401, 'unauthorized'));
        }

        req.authUserPayload = authUserPayload;
        next(); // we go the next middleware
      });

    } else {
      next(new HttpError(403, 'forbidden'));
    }
  } catch (error) {
    next(error);
  }
};
