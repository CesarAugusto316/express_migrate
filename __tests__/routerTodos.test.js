const request = require('supertest');
const { app } = require('../app.js');
const { routerAuth } = require('../routes/routerAuth.js');
const { routerTodos } = require('../routes/routerTodos.js');
const { isAuthenticated } = require('../middlewares/validateTokens.js');
const { defaultErrorHandler } = require('../middlewares/defaultErrorHandler.js');
const { connectDb, db } = require('../config/connectDB.js');
const { faker } = require('@faker-js/faker');


beforeAll(async () => {
  app.use('/api/v1/auth', routerAuth);
  app.use('/api/v1/todos', isAuthenticated, routerTodos);
  app.use(defaultErrorHandler);

  await connectDb();
});

afterAll(async () => {
  await db.getQueryInterface().bulkDelete('user', null, {});
  await db.getQueryInterface().bulkDelete('todo', null, {});

  await db.close();
});


// integration testing
describe('[routerTodos ⚡]', () => {
  const agent = request.agent(app);
  let loggedUser;
  let todo;
  const testUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(12)
  };

  describe('isAuthenticated before CRUD operations', () => {

    beforeAll(async () => {
      // 1. creates a new user
      await request(app).post('/api/v1/auth/signup').send(testUser);

      // 2. authenticates that new user
      loggedUser = await agent.post('/api/v1/auth/login').send({
        email: testUser.email,
        password: testUser.password
      });

      // 3. we define the Authorization header for every future request
      agent.auth(loggedUser.body.accessToken, { type: 'bearer' });
    });

    test('authenticated user should create a todo', async () => {
      todo = await agent.post('/api/v1/todos').send({
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(5)
      });

      expect(todo.statusCode).toBe(201);
      expect(todo.body).toHaveProperty('todo');
    });

    test('authenticated user should update a todo', async () => {
      const res = await agent
        .patch(`/api/v1/todos/${todo.body.todo.id}`)
        .send({
          title: faker.lorem.words(3),
          description: faker.lorem.sentence(5),
          id: loggedUser.body.user.id
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('todo');
    });

    test('authenticated user should getAll todos by user', async () => {
      const res = await agent
        .get('/api/v1/todos');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('todos');
      expect(res.body.todos).toBeInstanceOf(Array);
    });

    test('authenticated user should remove a todo', async () => {
      const res = await agent
        .delete(`/api/v1/todos/${todo.body.todo.id}`)
        .send({
          id: loggedUser.body.user.id
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('todo');
      expect(res.body.todo).toBe(null);
    });
  });
});
