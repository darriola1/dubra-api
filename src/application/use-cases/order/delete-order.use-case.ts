import { PedidoRepository } from "../../../domain/repositories/order.repository";

export class DeletePedidoUseCase {
  constructor(private readonly pedidoRepo: PedidoRepository) {}

  async execute(id: number) {
    return this.pedidoRepo.delete(id);
  }
}
