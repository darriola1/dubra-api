import { OrderRepository } from "../../../domain/repositories/order.repository";
import { UpdateOrderDTO } from "../../../domain/dtos/order.dto";

export class UpdateOrderUseCase {
  constructor(private readonly orderRepo: OrderRepository) {}

  async update(id: number, data: UpdateOrderDTO) {
    return this.orderRepo.update(id, data);
  }
}
