import { PedidoRepository } from "../../../domain/repositories/order.repository";

export class FindAllPedidosUseCase {
  constructor(private readonly pedidoRepo: PedidoRepository) {}

  async execute() {
    return this.pedidoRepo.findAll();
  }
}
