import { PrismaClient } from '../../../generated/prisma/client';
import { IOrderRepository } from '@/domain/repositories/order.repository';
import { CreateOrderDTO, UpdateOrderDTO } from '@/application/schemas/order.schema';

export class OrderDatasource implements IOrderRepository {
	constructor(private readonly prisma: PrismaClient) {}
	async create(data: CreateOrderDTO) {
		return this.prisma.order.create({
			data: {
				description: data.description,
				userId: data.userId, // Map usuarioId to userId as expected by Prisma
			},
		});
	}

	async findAll() {
		return this.prisma.order.findMany({
			include: { user: true },
		});
	}

	async findById(id: number) {
		return this.prisma.order.findUnique({
			where: { id },
			include: { user: true },
		});
	}

	async update(id: number, data: UpdateOrderDTO) {
		return this.prisma.order.update({
			where: { id },
			data,
		});
	}

	async delete(id: number) {
		await this.prisma.order.delete({
			where: { id },
		});
	}
}
