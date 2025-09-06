const request = require('supertest');
const app = require('../server');

let token = '';
let taskId = '';
let organizationId = '';
let projectId = '';
let employeeId = '';

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/signup')
    .send({
      email: `task${Date.now()}@example.com`,
      password: 'password123',
      name: 'Task User',
      organization: {
        name: 'Task Org',
        description: 'Task Org Desc',
        contactPhone: '1234567890',
        address: 'Task Address'
      }
    });
  token = res.body.token;
  organizationId = res.body.user.organizationId || res.body.organization.id;


  const projectRes = await request(app)
    .post('/api/projects')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Project for Task',
      description: 'Project Desc',
      startDate: '2024-06-01',
      endDate: '2024-12-31',
      status: 'active',
      assignedEmployees: []
    });
  projectId = projectRes.body._id;

  
  const empRes = await request(app)
    .post('/api/employees')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Task Employee',
      position: 'Developer',
      department: 'IT',
      email: `emp${Date.now()}@example.com`,
      hireDate: '2024-06-01',
      salary: 50000,
      contact: '1234567890',
      joiningDate: '2024-06-01'
    });
  employeeId = empRes.body._id;
});

describe('Task Routes', () => {
  it('should create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Task 1',
        description: 'Task description',
        assignedTo: employeeId,
        project: projectId,
        dueDate: '2024-07-01',
        priority: 'medium',
        status: 'pending',
        organizationId: organizationId
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    taskId = res.body._id;
  });

  it('should get all tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get task by id', async () => {
    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', taskId);
  });

  it('should update task', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'completed' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('completed');
  });

  it('should delete task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});