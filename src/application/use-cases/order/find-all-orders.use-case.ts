import { OrderRepository } from "../../../domain/repositories/order.repository";

export class FindAllOrdersUseCase {
  constructor(private readonly orderRepo: OrderRepository) {}

  async findAll() {
    return this.orderRepo.findAll();
  }
}
