import { z } from '../../docs/zod-openapi';
import { UserSchema as BaseUserSchema } from '@/generated/zod/modelSchema/UserSchema';

export const UserSchema = BaseUserSchema.pick({
	id: true,
	email: true,
	name: true,
	customerId: true,
	password: true,
}).openapi({
	title: 'User',
	description: 'Schema representing a user in the system',
});

// Registro de usuario
export const RegisterSchema = BaseUserSchema.pick({
	name: true,
	email: true,
	password: true,
})
	.extend({
		name: z
			.string()
			.min(3, 'Name is required, minimum 3 characters')
			.refine((val) => !/<\/?[a-z][\s\S]*>/i.test(val), {
				message: 'Name contains invalid characters',
			})
			.openapi({ example: 'Juan Pérez', description: 'User full name' }),

		email: z.string().email('Invalid email address').openapi({ example: 'juan@example.com', description: 'Valid email address' }),

		password: z
			.string()
			.min(6, 'Password must be at least 6 characters')
			.refine((val) => /[a-z]/.test(val), { message: 'Must contain at least one lowercase letter' })
			.refine((val) => /[A-Z]/.test(val), { message: 'Must contain at least one uppercase letter' })
			.refine((val) => /\d/.test(val), { message: 'Must contain at least one number' })
			.refine((val) => /[\W_]/.test(val), { message: 'Must contain at least one symbol' })
			.openapi({ example: 'StrongP@ss1', description: 'Secure password' }),
	})
	.openapi({
		title: 'Register User',
		description: 'Schema for user registration',
	});

// Login
export const LoginSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email address').openapi({ example: 'juan2@example.com', description: 'User email' }),

	password: z.string().min(6, 'Password must be at least 6 characters long').openapi({ example: 'StrongP@ss1', description: 'User password' }),
});

// Respuesta de autenticación
export const AuthResponseSchema = z
	.object({
		token: z.string().openapi({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
		user: z.object({
			id: z.number(),
			name: z.string(),
			email: z.string(),
		}),
	})
	.openapi({
		title: 'Auth Response',
		description: 'Schema for the response returned after successful login or register',
	});

// Cambio de contraseña
export const ChangePasswordSchema = z.object({
	email: z.string().email('Invalid email address').openapi({ example: 'juan@example.com' }),
	password: z.string().min(6, 'Current password must be at least 6 characters long').openapi({ example: 'OldP@ss1', description: 'Current password' }),
	newPassword: z.string().min(6, 'New password must be at least 6 characters long').openapi({ example: 'NewP@ss1', description: 'New password' }),
});

// Tipos inferidos que usamos como DTOs
export type UserDTO = z.infer<typeof UserSchema>;
export type RegisterDTO = z.infer<typeof RegisterSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;
export type ChangePasswordDTO = z.infer<typeof ChangePasswordSchema>;
export type AuthResponseDTO = z.infer<typeof AuthResponseSchema>;
