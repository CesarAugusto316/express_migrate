const { HttpError } = require('../middlewares/httpError.js');
const { Todo } = require('../models/todo.js');


/**
 *
 * @type {import('express').RequestHandler}
 */
const getAll = async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
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
const getById = async (req, res, next) => {

};

/**
 *
 * @type {import('express').RequestHandler}
 */
const create = async (req, res, next) => {

};

/**
 *
 * @type {import('express').RequestHandler}
 */
const update = async (req, res, next) => {

};

/**
 *
 * @type {import('express').RequestHandler}
 */
const remove = async (req, res, next) => {

};

module.exports = { getAll, getById, create, update, remove };
