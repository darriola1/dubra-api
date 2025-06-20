import { IOrderRepository } from '../../../domain/repositories/order.repository';

export class DeleteOrderUseCase {
	constructor(private readonly orderRepo: IOrderRepository) {}

	async delete(id: number) {
		return this.orderRepo.delete(id);
	}
}
