const request = require('supertest');
const { app } = require('../app.js');
const { routerAuth } = require('../routes/routerAuth.js');
const { routerUsers } = require('../routes/routerUser.js');
const { defaultErrorHandler } = require('../middlewares/defaultErrorHandler.js');
const { connectDb, db } = require('../config/connectDB.js');
const { faker } = require('@faker-js/faker');


beforeAll(async () => {
  app.use('/api/v1/auth', routerAuth);
  app.use('/api/v1/users', routerUsers); // requires token validation
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
  const testUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(12)
  };

  describe('requires Authorization bearer accessToken', () => {
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

    it('should create todo', async () => {
      const { user } = loggedUser.body;
      const res = await agent.post(`/api/v1/users/${user.id}/todos`).send({
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(5)
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('todo');
    });

    // it('should update todo', async () => {
    //   const { user } = loggedUser.body;
    //   const res = await agent
    //     .patch(`/api/v1/todos/${user.id}`)
    //     .send({
    //       title: faker.lorem.words(3),
    //       description: faker.lorem.sentence(5),
    //       id: 1
    //     });

    //   expect(res.statusCode).toBe(201);
    //   expect(res.body).toHaveProperty('todo');
    // });

    it('should getAll todos by user', async () => {
      const { user } = loggedUser.body;
      const res = await agent
        .get(`/api/v1/users/${user.id}/todos`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('todos');
      expect(res.body.todos).toBeInstanceOf(Array);
    });

    // it('should remove a todo', async () => {
    //   const { user } = loggedUser.body;
    //   const res = await agent
    //     .post(`/api/v1/todos/${user.id}`)
    //     .send({
    //       title: faker.lorem.words(3),
    //       description: faker.lorem.sentence(5)
    //     });

    //   expect(res.statusCode).toBe(201);
    //   expect(res.body).toHaveProperty('todo');
    // });
  });
});
