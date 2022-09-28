const { Router } = require('express');


const routerTodos = Router();

routerTodos.route('/')
  .get()
  .post();

routerTodos.route('/:id')
  .get()
  .patch()
  .delete();

module.exports = { routerTodos };
