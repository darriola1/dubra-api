import { Request, Response } from 'express';
import { CreateOrderSchema, UpdateOrderSchema } from '@/application/schemas/order.schema';
import { CustomError } from '@/shared/utils/custom.error';
import { logger } from '@/shared/utils/logger';
// Importación de los use cases
import { CreateOrderUseCase } from '@/application/use-cases/order/create-order.use-case';
import { FindAllOrdersUseCase } from '@/application/use-cases/order/find-all-orders.use-case';
import { FindOrderByIdUseCase } from '@/application/use-cases/order/find-order-by-id.use-case';
import { UpdateOrderUseCase } from '@/application/use-cases/order/update-order.use-case';
import { DeleteOrderUseCase } from '@/application/use-cases/order/delete-order.use-case';

export class OrderController {
	constructor(private readonly createOrderUseCase: CreateOrderUseCase, private readonly findAllOrdersUseCase: FindAllOrdersUseCase, private readonly findOrderByIdUseCase: FindOrderByIdUseCase, private readonly updateOrderUseCase: UpdateOrderUseCase, private readonly deleteOrderUseCase: DeleteOrderUseCase) {}
	async create(req: Request, res: Response) {
		try {
			const parsed = CreateOrderSchema.safeParse(req.body);
			if (!parsed.success) return res.status(400).json(parsed.error.flatten());

			const order = await this.createOrderUseCase.create(parsed.data);
			logger.info('Orden creada:', order.id);
			res.status(201).json(order);
		} catch (error) {
			logger.error('Error al crear orden:', error);
			const message = error instanceof CustomError ? error.message : 'Unexpected error';
			const status = error instanceof CustomError ? error.statusCode : 500;

			res.status(status).json({ error: message });
		}
	}

	async findAll(req: Request, res: Response) {
		try {
			const orders = await this.findAllOrdersUseCase.findAll();
			logger.info('Ordenes encontradas:', orders.length);
			res.json(orders);
		} catch (error) {
			logger.error('Error al buscar ordenes:', error);
			const message = error instanceof CustomError ? error.message : 'Unexpected error';
			const status = error instanceof CustomError ? error.statusCode : 500;

			res.status(status).json({ error: message });
		}
	}

	async findById(req: Request, res: Response) {
		try {
			const id = parseInt(req.params.id);
			const order = await this.findOrderByIdUseCase.findBy(id);
			if (!order) return res.status(404).json({ error: 'Order no encontrado' });
			logger.info('Orden encontrada:', order.id);
			res.json(order);
		} catch (error) {
			logger.error('Error al crear orden:', error);
			const message = error instanceof CustomError ? error.message : 'Unexpected error';
			const status = error instanceof CustomError ? error.statusCode : 500;

			res.status(status).json({ error: message });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const id = parseInt(req.params.id);
			const parsed = UpdateOrderSchema.safeParse(req.body);
			if (!parsed.success) return res.status(400).json(parsed.error.flatten());

			const order = await this.updateOrderUseCase.update(id, parsed.data);
			logger.info('Orden actualizada:', order.id);
			res.json(order);
		} catch (error) {
			logger.error('Error al crear orden:', error);
			const message = error instanceof CustomError ? error.message : 'Unexpected error';
			const status = error instanceof CustomError ? error.statusCode : 500;

			res.status(status).json({ error: message });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const id = parseInt(req.params.id);
			await this.deleteOrderUseCase.delete(id);
			logger.info('Orden eliminada:', id);
			res.status(204).send();
		} catch (error) {
			logger.error('Error al crear orden:', error);
			const message = error instanceof CustomError ? error.message : 'Unexpected error';
			const status = error instanceof CustomError ? error.statusCode : 500;

			res.status(status).json({ error: message });
		}
	}
}
