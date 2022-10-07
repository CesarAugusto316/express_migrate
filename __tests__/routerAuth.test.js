const request = require('supertest');
const { faker } = require('@faker-js/faker');
const { app } = require('../app.js');
const { routerAuth } = require('../routes/routerAuth.js');
const { defaultErrorHandler } = require('../middlewares/defaultErrorHandler.js');
const { connectDb, db } = require('../config/connectDB.js');


beforeAll(async () => {
  app.use('/api/v1/auth', routerAuth);
  app.use(defaultErrorHandler);
  await connectDb();
});

afterAll(async () => {
  await db.getQueryInterface().bulkDelete('user', null, {});
  await db.close();
});


describe('[routerAuth ⚡])', () => {

  it('should create an user given the correct fields', async () => {
    const testUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(12)
    };
    const res = await request(app).post('/api/v1/auth/signup').send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('id');
  });

  it('should not create an user when body is missing some fields', async () => {
    const testUser = {
      lastName: faker.name.lastName(),
      password: faker.internet.password(12)
    };
    const res = await request(app).post('/api/v1/auth/signup').send(testUser);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('some fields are missing');
  });

  it('should not accept a password greater than 12 chars', async () => {
    const testUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(13)
    };
    const res = await request(app).post('/api/v1/auth/signup').send(testUser);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('password must be at most 12 chars long');
  });
});


// login
describe('routerAuth, login)', () => {

  it('should allow to log in with email and password', async () => {
    // 1. registers a new user
    const testUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(12)
    };
    await request(app).post('/api/v1/auth/signup').send(testUser);

    // 2. authenticates that new user
    const res = await request(app).post('/api/v1/auth/login').send({
      email: testUser.email,
      password: testUser.password
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('accessToken');
  });

  it('should not allow to log if some property is missing', async () => {
    // 1. registers a new user
    const testUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(12)
    };
    await request(app).post('/api/v1/auth/signup').send(testUser);

    // 2. login with email missing
    const res1 = await request(app).post('/api/v1/auth/login').send({
      password: testUser.password
    });
    expect(res1.statusCode).toBe(400);
    expect(res1.body.message).toBe('some fields are missing');

    // 3. login with password missing
    const res2 = await request(app).post('/api/v1/auth/login').send({
      email: testUser.email
    });
    expect(res2.statusCode).toBe(400);
    expect(res1.body.message).toBe('some fields are missing');
  });

  it('should not allow to log with the wrong password', async () => {
    // 1. registers a new user
    const testUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(12)
    };
    await request(app).post('/api/v1/auth/signup').send(testUser);

    // 2. login with a wrong password
    const res = await request(app).post('/api/v1/auth/login').send({
      email: testUser.email,
      password: faker.internet.password(10) // another new password
    });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('invalid credentials');
  });
});
