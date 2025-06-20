import { IOrderRepository } from '../../../domain/repositories/order.repository';

export class FindAllOrdersUseCase {
	constructor(private readonly orderRepo: IOrderRepository) {}

	async findAll() {
		return this.orderRepo.findAll();
	}
}
