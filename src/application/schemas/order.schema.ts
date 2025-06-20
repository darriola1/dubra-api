// src/application/schemas/order.schema.ts
import { z } from '@/docs/zod-openapi';
import { OrderSchema as BaseOrderSchema } from '@/generated/zod/modelSchema/OrderSchema';

export const CreateOrderSchema = BaseOrderSchema.pick({
	description: true,
	userId: true,
}).extend({
	description: z.string().min(1).openapi({
		example: 'Entrega programada',
		description: 'Breve descripción del pedido',
	}),
	userId: z.number().int().positive().openapi({
		example: 42,
		description: 'ID del usuario que genera la orden',
	}),
});

export type CreateOrderDTO = z.infer<typeof CreateOrderSchema>;

export const UpdateOrderSchema = CreateOrderSchema.partial().openapi({
	description: 'Actualización parcial de la orden',
});

export type UpdateOrderDTO = z.infer<typeof UpdateOrderSchema>;
