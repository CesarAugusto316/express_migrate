const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.js');
const { HttpError } = require('../middlewares/httpError.js');


/**
 *
 * @type {import('express').RequestHandler}
 */
const signup = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
      return next(new HttpError(400, 'some fields are missing'));
    }
    if (req.body?.password?.length > 12) {
      return next(new HttpError(400, 'password must be at most 12 chars long'));
    }

    const [newUser, isCreated] = await User.findOrCreate({
      where: {
        email: req.body.email
      },
      defaults: {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10)
      }
    });

    if (isCreated) {
      res.status(201).json({
        message: 'user created',
        id: newUser.id
      });
    } else {
      return next(new HttpError(400, 'a user with this email already exists'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @type {import('express').RequestHandler}
 */
const login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return next(new HttpError(400, 'some fields are missing'));
    }

    const foundUserByEmail = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (foundUserByEmail) {
      const hasValidPassword = bcrypt.compareSync(req.body.password, foundUserByEmail.password);

      if (hasValidPassword) {
        const payload = {
          id: foundUserByEmail.id,
          email: foundUserByEmail.email,
          firstName: foundUserByEmail.firstName
        };

        const accessToken = jwt
          .sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
        const refreshToken = jwt
          .sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10h' });

        const threeMonths = new Date();
        threeMonths.setMonth(threeMonths.getMonth() + 3);

        console.log('3 months:', threeMonths);

        return res.
          cookie('refresh_token', refreshToken,
            { httpOnly: true, expires: threeMonths }
          )
          .status(200)
          .json({
            message: 'login successful',
            user: foundUserByEmail,
            accessToken,
          });
      }
    }
    return next(new HttpError(403, 'invalid credentials'));

  } catch (error) {
    next(error);
  }
};

/**
 *
 * @type {import('express').RequestHandler}
 */
const refreshToken = async (req, res, next) => {
  console.log('req.originalUrl:', req.originalUrl);
  try {
    /** @type {string} */
    const refreshToken = req.cookies['refresh_token'];
    const { payload } = jwt
      .verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, { complete: true });

    const accessToken = jwt
      .sign(
        {
          id: payload.id,
          email: payload.email,
          firstName: payload.firstName
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '60s' }
      );

    if (accessToken) {
      // req.headers.authorization = `Bearer ${accessToken}`;
      // res.redirect('back');
      res.status(200).json({
        accessToken
      });
    } else {
      next(new HttpError(500, 'we could not refresh the token'));
    }
  } catch (error) {
    next(error);
  }
};


module.exports = { signup, login, refreshToken };
