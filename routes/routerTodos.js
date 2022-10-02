const { Router } = require('express');
const { requireAuth } = require('../middlewares/requireAuth.js');
const { getAllByUser, create, remove, update } = require('../controllers/controllerTodos.js');


const routerTodos = Router();

// 1. log in before any action
routerTodos.route('/:id')
  .get(requireAuth, getAllByUser)
  .post(requireAuth, create)
  .patch(requireAuth, update)
  .delete(requireAuth, remove);

module.exports = { routerTodos };
