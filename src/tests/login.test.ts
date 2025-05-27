import request from 'supertest';
import express from 'express';
import authRoutes from '@/infrastructure/http/routes/auth.routes';

// se mockea la funcion reCAPTCHA para que siempre devuelva `true` durante los tests.
// Jest reemplaza la función original por simulacion (`jest.fn().mockResolvedValue(true)`) y esto evita llamadas reales al servicio de google reCAPTCHA y permite testear sin depender de tokens válidos.
jest.mock('@/shared/utils/recaptcha', () => ({
  reCAPTCHA: jest.fn().mockResolvedValue(true)
}));

// se crea un usuario para poder hacer login y no depender del test de registro
async function createTestUser() {
	const dinamicUser = Date.now();
	const user = {
		name: `Test ${dinamicUser}`,
		email: `test${dinamicUser}@dubra.com`,
		password: '@AAAaaa111',
		recaptchaToken: 'fake-token'
	};

	await request(app).post('/auth/register').send(user);
	return user;
}

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('POST /auth/login', () => {
	test('should return a jwt, user data and status code 200', async () => {

		const user = await createTestUser();
		const res = await request(app).post('/auth/login').send({
			email: user.email,
			password: user.password,
			recaptchaToken: 'fake-token'

		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('user.id');
		expect(res.body).toHaveProperty('user.name');
		expect(res.body).toHaveProperty('user.email');

		//Cpmo el token viene en una cookie lo extraemos de ahi y no del body.
		const cookies = res.headers['set-cookie'];
		expect(cookies).toBeDefined();
		expect(cookies[0]).toMatch(/token=/);
	});

	test('should return 401 if password is incorrect', async () => {
		const user = await createTestUser();

		const res = await request(app).post('/auth/login').send({
			email: user.email,
			password: 'wrong-password',
			recaptchaToken: 'fake-token'
		});

		expect(res.statusCode).toBe(401); 
		expect(res.body).toHaveProperty('error', 'Invalid credentials');
	});

	test('should return 401 if user does not exist', async () => {
		const res = await request(app).post('/auth/login').send({
			email: 'nonexistent@dubra.com',
			password: 'nonexistent-password',
			recaptchaToken: 'fake-token'
		});

		expect(res.statusCode).toBe(401); 
		expect(res.body).toHaveProperty('error', 'Invalid credentials');
	});
});
