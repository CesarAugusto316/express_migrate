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
        password: await bcrypt.hash(req.body.password, 10)
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

    const foundUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (foundUser) {
      const hasValidPassword = await bcrypt.compare(req.body.password, foundUser.password);

      if (hasValidPassword) {
        const payload = { id: foundUser.id, email: foundUser.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

        return res.status(200).json({
          message: 'login successfull',
          user: foundUser,
          accessToken: token
        });
      }
    }
    return next(new HttpError(404, 'invalid credentials'));

  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };
