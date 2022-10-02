const { Router } = require('express');
// const { requireAuth } = require('../middlewares/requireAuth.js');
const { getAllByUser, create, remove, update } = require('../controllers/controllerTodos.js');


const routerTodos = Router({ mergeParams: true });

// 1. log in before any action
routerTodos.route('/')
  .get(getAllByUser)
  .post(create);

routerTodos.route('/:todoId')
  .patch(update)
  .delete(remove);

module.exports = { routerTodos };
