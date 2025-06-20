import { IOrderRepository } from '@/domain/repositories/order.repository';
import { CreateOrderDTO } from '@/domain/dtos-unused/order.dto';

export class CreateOrderUseCase {
	constructor(private readonly orderRepo: IOrderRepository) {}

	async create(data: CreateOrderDTO) {
		return this.orderRepo.create(data);
	}
}
