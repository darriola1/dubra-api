import { IOrderRepository } from '../../../domain/repositories/order.repository';
import { UpdateOrderDTO } from '../../../domain/dtos-unused/order.dto';

export class UpdateOrderUseCase {
	constructor(private readonly orderRepo: IOrderRepository) {}

	async update(id: number, data: UpdateOrderDTO) {
		return this.orderRepo.update(id, data);
	}
}
