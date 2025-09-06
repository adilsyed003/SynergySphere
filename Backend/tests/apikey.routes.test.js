const request = require('supertest');
const app = require('../server');

let token = '';
let apiKey = '';

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/signup')
    .send({
      email: `admin${Date.now()}@example.com`,
      password: 'password123',
      name: 'Admin User',
      organization: {
        name: 'Admin Org',
        description: 'Admin Org Desc',
        contactPhone: '1234567890',
        address: 'Admin Address'
      }
    });
  token = res.body.token;
});

describe('API Key Routes', () => {
  it('should generate an API key', async () => {
    const res = await request(app)
      .post('/api/apikeys/generate')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('apiKey');
    apiKey = res.body.apiKey;
  });

  it('should revoke an API key', async () => {
    const res = await request(app)
      .post('/api/apikeys/revoke')
      .set('Authorization', `Bearer ${token}`)
      .send({ key: apiKey });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('should rotate an API key', async () => {
    const genRes = await request(app)
      .post('/api/apikeys/generate')
      .set('Authorization', `Bearer ${token}`);
    const oldKey = genRes.body.apiKey;

    const res = await request(app)
      .post('/api/apikeys/rotate')
      .set('Authorization', `Bearer ${token}`)
      .send({ key: oldKey });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('apiKey');
  });
});