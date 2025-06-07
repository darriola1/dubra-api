import { PedidoRepository } from "../../../domain/repositories/order.repository";
import { UpdatePedidoDTO } from "../../../domain/dtos/order.dto";

export class UpdatePedidoUseCase {
  constructor(private readonly pedidoRepo: PedidoRepository) {}

  async execute(id: number, data: UpdatePedidoDTO) {
    return this.pedidoRepo.update(id, data);
  }
}
