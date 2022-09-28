const { Router } = require('express');
const { requireAuth } = require('../middlewares/requireAuth.js');
const { getAll, create, getById, remove, update } = require('../controllers/controllerTodos');


const routerTodos = Router();

routerTodos.route('/')
  .get(getAll)
  .post(requireAuth, create);

routerTodos.route('/:id')
  .get(requireAuth, getById)
  .patch(requireAuth, update)
  .delete(requireAuth, remove);

module.exports = { routerTodos };
