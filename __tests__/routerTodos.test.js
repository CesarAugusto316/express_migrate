const request = require('supertest');
const { faker } = require('@faker-js/faker');
const { app } = require('../app.js');
const { routerTodos } = require('../routes/routerTodos.js');
const { defaultErrorHandler } = require('../middlewares/defaultErrorHandler.js');
const { connectDb, db } = require('../config/connectDB.js');


beforeAll(async () => {
  app.use('/api/v1/todos', routerTodos);
  app.use(defaultErrorHandler);
  await connectDb();
});

afterAll(async () => {
  await db.close();
});

describe('app.use(\'/api/v1/todos\', routerTodos)', () => {
  it('should get all todos for not logged In users', async () => {

    const res = await request(app).get('/api/v1/todos');

    expect(res.statusCode).toBe(200);
    expect(res.body.todos).toBeInstanceOf(Array);
  });
});
