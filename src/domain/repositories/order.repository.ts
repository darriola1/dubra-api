import { CreatePedidoDTO, UpdatePedidoDTO } from "../dtos/order.dto";

export interface PedidoRepository {
  create(data: CreatePedidoDTO): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  update(id: number, data: UpdatePedidoDTO): Promise<any>;
  delete(id: number): Promise<void>;
}