const { Router } = require('express');
// const { requireAuth } = require('../middlewares/requireAuth.js');
const { getAll, create, getById, remove, update } = require('../controllers/controllerTodos');


const routerTodos = Router();

routerTodos.route('/')
  .get(getAll)
  .post(create);

routerTodos.route('/:id')
  .get(getById)
  .patch(update)
  .delete(remove);

module.exports = { routerTodos };
