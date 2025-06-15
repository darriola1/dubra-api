import { PrismaClient } from '../../../generated/prisma/client';
import { OrderRepository } from '@/domain/repositories/order.repository';
import { CreateOrderDTO, UpdateOrderDTO } from '@/domain/dtos/order.dto';

const prisma = new PrismaClient();

export class OrderDatasource implements OrderRepository {
	constructor(private readonly prisma: PrismaClient) {}
	async create(data: CreateOrderDTO) {
		return this.prisma.order.create({
			data,
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
