import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { RegisterSchema, LoginSchema, ChangePasswordSchema } from '../application/schemas/user.schema';

const PORT = process.env.APP_PORT || 3003;
const registry = new OpenAPIRegistry();

registry.register('RegisterUser', RegisterSchema);
registry.register('LoginUser', LoginSchema);
registry.register('ChangePassword', ChangePasswordSchema);

// Registra rutas de autenticación
registry.registerPath({
	method: 'post',
	path: '/auth/register',
	request: {
		body: {
			description: 'Registro de nuevo usuario',
			required: true,
			content: {
				'application/json': {
					schema: RegisterSchema,
				},
			},
		},
	},
	responses: {
		201: { description: 'Usuario registrado con éxito' },
		400: { description: 'Error de validación o negocio' },
	},
});

registry.registerPath({
	method: 'post',
	path: '/auth/login',
	request: {
		body: {
			description: 'Login de usuario',
			required: true,
			content: {
				'application/json': {
					schema: LoginSchema,
				},
			},
		},
	},
	responses: {
		200: { description: 'Login exitoso' },
		400: { description: 'Error de validación o credenciales' },
	},
});

registry.registerPath({
	method: 'post',
	path: '/auth/change-password',
	request: {
		body: {
			description: 'Cambio de contraseña del usuario',
			required: true,
			content: {
				'application/json': {
					schema: ChangePasswordSchema,
				},
			},
		},
	},
	responses: {
		200: { description: 'Contraseña cambiada con éxito' },
		400: { description: 'Error de validación' },
	},
});

// Registrar rutas de órdenes
registry.registerPath({
	method: 'post',
	path: '/orders',
	request: {
		body: {
			description: 'Crear una nueva orden',
			required: true,
			content: {
				'application/json': {
					schema: {},
				},
			},
		},
	},
	responses: {
		201: { description: 'Orden creada con éxito' },
		400: { description: 'Error de validación' },
	},
});

registry.registerPath({
	method: 'get',
	path: '/orders',
	request: {},
	responses: {
		200: { description: 'Lista de órdenes' },
		400: { description: 'Error de validación' },
	},
});

registry.registerPath({
	method: 'get',
	path: '/orders/{id}',
	request: {},
	responses: {
		200: { description: 'Detalle de la orden' },
		400: { description: 'Error de validación' },
	},
});

registry.registerPath({
	method: 'put',
	path: '/orders/{id}',
	request: {
		body: {
			description: 'Actualizar orden',
			required: true,
			content: {
				'application/json': {
					schema: {},
				},
			},
		},
	},
	responses: {
		200: { description: 'Orden actualizada con éxito' },
		400: { description: 'Error de validación' },
	},
});

registry.registerPath({
	method: 'delete',
	path: '/orders/{id}',
	request: {},
	responses: {
		200: { description: 'Orden eliminada con éxito' },
		400: { description: 'Error de validación' },
	},
});

// Registrar rutas de usuario
registry.registerPath({
	method: 'get',
	path: '/users/me',
	request: {},
	responses: {
		200: { description: 'Detalles del usuario actual' },
		400: { description: 'Error de validación o negocio' },
	},
});

// Genera el documento OpenAPI
const generator = new OpenApiGeneratorV3(registry.definitions);
export const openApiDocument = generator.generateDocument({
	openapi: '3.0.0',
	info: {
		title: 'Dubra Logistics API',
		description: 'API de Dubra para gestión de envíos y logística',
		version: '1.0.0',
	},
	servers: [{ url: `http://localhost:${PORT}` }],
});
