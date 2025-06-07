import { PedidoRepository } from "@/domain/repositories/order.repository";
import { CreatePedidoDTO } from "@/domain/dtos/order.dto";

export class CreatePedidoUseCase {
	constructor(private readonly pedidoRepo: PedidoRepository) {}

	async execute(data: CreatePedidoDTO) {
		return this.pedidoRepo.create(data);
	}
}