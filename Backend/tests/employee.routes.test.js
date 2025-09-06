const request = require('supertest');
const app = require('../server'); 

let token = '';
let employeeId = '';

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/signup')
    .send({
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      name: 'Test User',
      organization: {
        name: 'Test Org',
        description: 'Test Org Desc',
        contactPhone: '1234567890',
        address: 'Test Address'
      }
    });
  token = res.body.token;
});

describe('Employee Routes', () => {
  it('should create an employee', async () => {
    const res = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        position: 'Developer',
        department: 'IT',
        email: `john${Date.now()}@example.com`,
        hireDate: '2024-06-01',
        salary: 50000,
        contact: '1234567890',
        joiningDate: '2024-06-01'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    employeeId = res.body._id;
  });

  it('should get all employees', async () => {
    const res = await request(app)
      .get('/api/employees')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get employee by id', async () => {
    const res = await request(app)
      .get(`/api/employees/${employeeId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', employeeId);
  });

  it('should update employee', async () => {
    const res = await request(app)
      .patch(`/api/employees/${employeeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ position: 'Senior Developer' });
    expect(res.statusCode).toBe(200);
    expect(res.body.position).toBe('Senior Developer');
  });

  it('should delete employee', async () => {
    const res = await request(app)
      .delete(`/api/employees/${employeeId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});