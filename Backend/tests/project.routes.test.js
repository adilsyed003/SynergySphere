const request = require('supertest');
const app = require('../server');

let token = '';
let projectId = '';

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/signup')
    .send({
      email: `proj${Date.now()}@example.com`,
      password: 'password123',
      name: 'Proj User',
      organization: {
        name: 'Proj Org',
        description: 'Proj Org Desc',
        contactPhone: '1234567890',
        address: 'Proj Address'
      }
    });
  token = res.body.token;
});

describe('Project Routes', () => {
  it('should create a project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Project X',
        description: 'Project description',
        startDate: '2024-06-01',
        endDate: '2024-12-31',
        status: 'active',
        assignedEmployees: []
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    projectId = res.body._id;
  });

  it('should get all projects', async () => {
    const res = await request(app)
      .get('/api/projects')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get project by id', async () => {
    const res = await request(app)
      .get(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', projectId);
  });

  it('should update project', async () => {
    const res = await request(app)
      .put(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'completed' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('completed');
  });

  it('should delete project', async () => {
    const res = await request(app)
      .delete(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});