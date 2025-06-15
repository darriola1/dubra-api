import { z } from '../../docs/zod-openapi';

export const CreateOrderSchema = z.object({
	descripcion: z.string().min(1, 'Description is required').openapi({
		example: 'Entrega urgente de documentos',
		description: 'Brief description of the delivery',
	}),

	pickupAddress: z.string().min(1, 'Pickup address is required').openapi({
		example: 'Av. 18 de Julio 1234, Montevideo',
		description: 'Origin address',
	}),

	dropoffAddress: z.string().min(1, 'Dropoff address is required').openapi({
		example: 'Ciudad de la Costa, Canelones',
		description: 'Destination address',
	}),

	usuarioId: z.number().int().positive().openapi({
		example: 42,
		description: 'User ID making the order',
	}),

	status: z.enum(['pendiente', 'en_camino', 'entregado', 'cancelado']).openapi({
		example: 'pendiente',
		description: 'Order status',
	}),
});

export const UpdateOrderSchema = CreateOrderSchema.partial().openapi({
	description: 'Partial update for an order',
});

// Tipos inferidos que usamos como DTOs
export type CreateOrderDTO = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderDTO = z.infer<typeof UpdateOrderSchema>;
