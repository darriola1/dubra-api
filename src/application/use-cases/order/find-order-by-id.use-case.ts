import { PedidoRepository } from "../../../domain/repositories/order.repository";

export class FindPedidoByIdUseCase {
  constructor(private readonly pedidoRepo: PedidoRepository) {}

  async execute(id: number) {
    return this.pedidoRepo.findById(id);
  }
}
