import request from 'supertest';
import express from 'express';
import authRoutes from '@/infrastructure/http/routes/auth.routes';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('POST /auth/login', () => {
	test('should return a jwt, user data and status code 200', async () => {
		const res = await request(app).post('/auth/login').send({
			email: 'denis@dubra.com',
			password: '123456',
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('id');
		expect(res.body).toHaveProperty('name', 'Test User');
		expect(res.body).toHaveProperty('email');
		expect(res.body).not.toHaveProperty('password');
	});

	// test('should return 400 if email is already in use', async () => {
	// 	const email = `duplicate${Date.now()}@dubra.com`;

	// 	await request(app).post('/auth/register').send({
	// 		name: 'Existing',
	// 		email,
	// 		password: '123456',
	// 	});

	// 	const res = await request(app).post('/auth/register').send({
	// 		name: 'Existing Again',
	// 		email,
	// 		password: '123456',
	// 	});

	// 	expect(res.statusCode).toBe(400);
	// 	expect(res.body).toHaveProperty('error', 'Email is already in use');
	// });
});
