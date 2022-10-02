const { Router } = require('express');
const { requireAuth } = require('../middlewares/requireAuth.js');
const { routerTodos } = require('./routerTodos.js');
const { getAll, getById, remove, update } = require('../controllers/controllerUser.js');


const routerUsers = Router();

routerUsers.route('/')
  .get(getAll);

routerUsers.use(requireAuth).route('/:userId')
  .get(getById)
  .patch(update)
  .delete(remove);

// nested routers
routerUsers.use('/:userId/todos', routerTodos);

module.exports = { routerUsers };
