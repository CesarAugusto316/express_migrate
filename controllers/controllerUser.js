const { User } = require('../models/user.js');
const { HttpError } = require('../middlewares/httpError.js');


/**
 * 
 * @type {import('express').RequestHandler}
 */
const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({ order: [['id', 'ASC']] });

    if (users) {
      res.status(200).json({
        users
      });
    } else {
      return next(new HttpError(404, 'users not found'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type {import('express').RequestHandler}
 */
const getById = async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.params.id);

    if (user) {
      res.status(200).json({
        user
      });
    } else {
      return next(new HttpError(404, 'user not found'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type {import('express').RequestHandler}
 */
const update = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      await user.set({
        ...req.body
      })
        .save();

      res.status(200).json({
        user
      });
    } else {
      return next(new HttpError(404, 'user not found'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type {import('express').RequestHandler}
 */
const remove = async (req, res, next) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id
      }
    });

    if (user === 1) {
      res.status(200).json({
        user: null
      });
    } else {
      return next(new HttpError(404, 'user not found'));
    }
  } catch (error) {
    next(error);
  }
};


module.exports = { getAll, getById, update, remove };
