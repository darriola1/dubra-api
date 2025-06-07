import { OrderRepository } from "../../../domain/repositories/order.repository";

export class FindOrderByIdUseCase {
  constructor(private readonly orderRepo: OrderRepository) {}

  async execute(id: number) {
    return this.orderRepo.findById(id);
  }
}
