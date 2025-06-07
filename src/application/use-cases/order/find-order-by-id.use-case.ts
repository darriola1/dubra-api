import { OrderRepository } from "../../../domain/repositories/order.repository";

export class FindOrderByIdUseCase {
  constructor(private readonly orderRepo: OrderRepository) {}

  async findBy(id: number) {
    return this.orderRepo.findById(id);
  }
}
