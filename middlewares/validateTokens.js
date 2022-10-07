const jwt = require('jsonwebtoken');
const { HttpError } = require('./httpError.js');


/**
 * 
 * TODO: unit test
 * @description validates accessToken
 * @type {import("express").RequestHandler}
 */
exports.isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const accessToken = authHeader.split(' ')[1];

      jwt.
        verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {

              return res.redirect('auth/refreshtoken');
            }

            return next(new HttpError(401, err.name)); // unauthorized
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
