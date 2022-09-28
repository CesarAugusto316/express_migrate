const request = require('supertest');
const { faker } = require('@faker-js/faker');
const { app } = require('../app.js');
const { connectDb, db } = require('../config/connectDB.js');


describe('routerAuth', () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await db.close();
  });

  it('should create an user', async () => {
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

  it('should not create an user when body is not complete', async () => {
    const testUser = {
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
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
      password: faker.internet.password(14)
    };
    const res = await request(app).post('/api/v1/auth/signup').send(testUser);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('password must be at most 12 chars long');
  });
});
