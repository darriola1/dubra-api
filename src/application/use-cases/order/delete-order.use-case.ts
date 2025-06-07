import { OrderRepository } from "../../../domain/repositories/order.repository";

export class DeleteOrderUseCase {
  constructor(private readonly orderRepo: OrderRepository) {}

  async delete(id: number) {
    return this.orderRepo.delete(id);
  }
}
