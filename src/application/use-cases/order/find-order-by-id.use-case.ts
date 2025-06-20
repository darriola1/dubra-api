import { IOrderRepository } from '../../../domain/repositories/order.repository';

export class FindOrderByIdUseCase {
	constructor(private readonly orderRepo: IOrderRepository) {}

	async findBy(id: number) {
		return this.orderRepo.findById(id);
	}
}
