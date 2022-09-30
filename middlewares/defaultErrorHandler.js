/**
 * 
 * @param {import('./httpError').HttpError | Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
exports.defaultErrorHandler = (err, req, res, next) => {
  if (err) {
    const status = err.status || 500;
    const message = err.original?.message || err.message || 'Something went wrong';

    res.status(status).json({
      status,
      message
    });
  } else {
    next();
  }
};
