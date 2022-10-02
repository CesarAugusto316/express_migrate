const { HttpError } = require('../middlewares/httpError.js');
const { Todo } = require('../models/todo.js');


/**
 *
 * @type {import('express').RequestHandler}
 */
const getAllByUser = async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
      where: {
        userId: +req.params.id
      },
      order: [['updated_at', 'ASC']]
    });

    if (todos) {
      res.status(200).json({
        todos
      });
    } else {
      next(new HttpError(404, 'no todos found'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @type {import('express').RequestHandler}
 */
const create = async (req, res, next) => {
  try {
    const [newTodo, isCreated] = await Todo.findOrCreate({
      where: {
        ...req.body, // {title, description}
        userId: +req.params.id
      }
    });

    if (isCreated) {
      res.status(201).json({
        todo: newTodo
      });
    } else {
      next(new HttpError(400, `todo already exists for userId: ${req.params.id}`));
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
    const todo = await Todo.findOne({
      where: {
        userId: +req.params.id,
        id: +req.body.id
      }
    });

    if (todo) {
      await todo.set({
        ...req.body,
      })
        .save(); // only updates the values that have change

      res.status(200).json({
        todo
      });
    } else {
      next(new HttpError(400, `todo doesn't exist for userId: ${req.params.id}`));
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
    const deletedTodo = await Todo.destroy({
      where: {
        userId: +req.params.id,
        id: +req.body.id
      }
    });

    if (deletedTodo === 1) {
      res.status(200).json({
        todo: null
      });
    } else {
      next(new HttpError(400, `todo doesn't exists for userId: ${req.params.id}`));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllByUser, create, update, remove };
