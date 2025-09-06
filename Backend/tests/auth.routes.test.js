const request = require('supertest');
const app = require('../server');

describe('Auth Routes', () => {
  let email = `test${Date.now()}@example.com`;
  let password = 'password123';
  let token = '';

  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        email,
        password,
        name: 'Test User',
        organization: {
          name: 'Test Org',
          description: 'Test Org Desc',
          contactPhone: '1234567890',
          address: 'Test Address'
        }
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
  });
});