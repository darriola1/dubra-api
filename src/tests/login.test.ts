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
		expect(res.body).toHaveProperty('token');
		expect(res.body).toHaveProperty('user.id');
		expect(res.body).toHaveProperty('user.name', 'Denis');
		expect(res.body).toHaveProperty('user.email');
		expect(res.body).toHaveProperty('token');
	});

	// AGREGAR MAS TEST. EJEMPLO SI USUARIO NO EXISTE. SI LA CONTRASELA ES INCORRECTA
});
