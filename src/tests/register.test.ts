import request from 'supertest';
import express from 'express';
import authRoutes from '@/infrastructure/http/routes/auth.routes';

// se mockea la funcion reCAPTCHA para que siempre devuelva `true` durante los tests.
// Jest reemplaza la función original por simulacion (`jest.fn().mockResolvedValue(true)`) y esto evita llamadas reales al servicio de google reCAPTCHA y permite testear sin depender de tokens válidos.
jest.mock('@/shared/utils/recaptcha', () => ({
  reCAPTCHA: jest.fn().mockResolvedValue(true)
}));

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('POST /auth/register', () => {
  test('should register a new user and return 201', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: `test${Date.now()}@dubra.com`,
        password: '@AAAaaa111',
        confirmPassword: '@AAAaaa111', 
        rut: '123456789012',            
        recaptchaToken: 'fake-token'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'Test User');
    expect(res.body).toHaveProperty('email');
    expect(res.body).not.toHaveProperty('password');
  });

  test('should return 400 if email is already in use', async () => {
    const email = `duplicate${Date.now()}@dubra.com`;

    const userPayload = {
      name: 'Existing',
      email,
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
      rut: '123456789012',
      recaptchaToken: 'fake-token'
    };

    await request(app).post('/auth/register').send(userPayload);

    const res = await request(app).post('/auth/register').send(userPayload);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Email is already in use');
  });

  test('should return 400 if name is too short', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'A',
      email: `test${Date.now()}@dubra.com`,
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
      rut: '123456789012',
      recaptchaToken: 'fake-token'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toHaveProperty('name');
  });

  test('should return 400 if name contains HTML', async () => {
    const res = await request(app).post('/auth/register').send({
      name: '<script>alert(1)</script>',
      email: `test${Date.now()}@dubra.com`,
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
      rut: '123456789012',
      recaptchaToken: 'fake-token'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toHaveProperty('name');
  });

  test('should return 400 if email is invalid', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'invalid-email',
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
      rut: '123456789012',
      recaptchaToken: 'fake-token'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toHaveProperty('email');
  });

  test('should return 400 if password is weak', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: `test${Date.now()}@dubra.com`,
      password: '123456',
      confirmPassword: '123456',
      rut: '123456789012',
      recaptchaToken: 'fake-token'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toHaveProperty('password');
  });

  test('should return 400 if passwords do not match', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: `test${Date.now()}@dubra.com`,
      password: '@AAAaaa111',
      confirmPassword: '@BBBbbb222', 
      rut: '123456789012',
      recaptchaToken: 'fake-token'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toHaveProperty('confirmPassword');
  });

  test('should return 400 if RUT is too short', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: `test${Date.now()}@dubra.com`,
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
      rut: '123',
      recaptchaToken: 'fake-token'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toHaveProperty('rut');
  });

  test('should return 400 if recaptchaToken is missing', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: `test${Date.now()}@dubra.com`,
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
      rut: '123456789012'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toHaveProperty('recaptchaToken');
  });
});
