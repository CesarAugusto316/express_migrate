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

      jwt.verify(accessToken, process.env.JWT_SECRET, (error, decodedToken) => {
        if (error) {
          return next(new HttpError(401, 'unauthorized'));
        }

        req.authenticatedUser = decodedToken;
        next(); // we go the next middleware, everything is ok.
      });

    } else {
      next(new HttpError(403, 'forbidden'));
    }
  } catch (error) {
    next(error);
  }
};
