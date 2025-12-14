import request from 'supertest';
import app from '../../src/index';
import pool from '../../src/config/database';

describe('Sweets API', () => {
  let authToken: string;
  let adminToken: string;
  let sweetId: number;

  beforeAll(async () => {
    // Create test user
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'user@test.com',
        password: 'password123',
      });
    authToken = userRes.body.token;

    // Create admin user via registration then update role
    const adminRegisterRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'admin@test.com',
        password: 'password123',
      });
    
    // Update to admin role
    await pool.query(
      "UPDATE users SET role = 'admin' WHERE email = $1",
      ['admin@test.com']
    );
    
    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password123',
      });
    adminToken = adminRes.body.token || authToken;
  });

  afterAll(async () => {
    await pool.query('DELETE FROM sweets WHERE name LIKE $1', ['Test%']);
    await pool.query('DELETE FROM users WHERE email LIKE $1', ['%@test.com']);
    await pool.end();
  });

  describe('POST /api/sweets', () => {
    it('should create a sweet (admin only)', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test Chocolate',
          category: 'Chocolate',
          price: 5.99,
          quantity: 100,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Test Chocolate');
      sweetId = response.body.id;
    });

    it('should return 403 for non-admin users', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Sweet',
          category: 'Candy',
          price: 3.99,
          quantity: 50,
        });

      expect(response.status).toBe(403);
    });
  });

  describe('GET /api/sweets', () => {
    it('should get all sweets', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/sweets/search', () => {
    it('should search sweets by name', async () => {
      const response = await request(app)
        .get('/api/sweets/search')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ name: 'Chocolate' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    it('should purchase a sweet', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quantity: 1 });

      expect(response.status).toBe(200);
      expect(response.body.quantity).toBeLessThan(100);
    });

    it('should return 400 if insufficient quantity', async () => {
      // Set quantity to 0
      await pool.query('UPDATE sweets SET quantity = 0 WHERE id = $1', [sweetId]);

      const response = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quantity: 1 });

      expect(response.status).toBe(400);
    });
  });
});

