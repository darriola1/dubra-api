import { z } from '../../docs/zod-openapi';
import { UserSchema as BaseUserSchema } from '@/generated/zod/modelSchema/UserSchema';

// Registro de usuario
export const RegisterUserSchema = BaseUserSchema.pick({
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
export const LoginUserSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email address').openapi({ example: 'juan@example.com', description: 'User email' }),

	password: z.string().min(6, 'Password must be at least 6 characters long').openapi({ example: 'StrongP@ss1', description: 'User password' }),
});

// Cambio de contraseña
export const ChangePasswordSchema = z.object({
	password: z.string().min(6, 'Current password must be at least 6 characters long').openapi({ example: 'OldP@ss1', description: 'Current password' }),

	newPassword: z.string().min(6, 'New password must be at least 6 characters long').openapi({ example: 'NewP@ss1', description: 'New password' }),
});

// Tipos inferidos que usamos como DTOs
export type CreateUserDTO = z.infer<typeof RegisterUserSchema>;
export type LoginUserDTO = z.infer<typeof LoginUserSchema>;
export type ChanPasswordUserDTO = z.infer<typeof ChangePasswordSchema>;
