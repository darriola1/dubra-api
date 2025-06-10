import { OrderRepository } from "@/domain/repositories/order.repository";
import { CreateOrderDTO } from "@/domain/dtos/order.dto";

export class CreateOrderUseCase {
	constructor(private readonly orderRepo: OrderRepository) {}

	async create(data: CreateOrderDTO) {
		return this.orderRepo.create(data);
	}
}