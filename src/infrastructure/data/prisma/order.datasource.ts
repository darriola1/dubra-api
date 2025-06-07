import { PrismaClient } from "../../../generated/prisma/client";  
import { PedidoRepository } from "@/domain/repositories/order.repository";
import { CreatePedidoDTO, UpdatePedidoDTO } from "@/domain/dtos/order.dto";

const prisma = new PrismaClient();

export class PedidoDatasource implements PedidoRepository {
  async create(data: CreatePedidoDTO) {
    return prisma.pedido.create({
      data,
    });
  }

  async findAll() {
    return prisma.pedido.findMany({
      include: { usuario: true },
    });
  }

  async findById(id: number) {
    return prisma.pedido.findUnique({
      where: { id },
      include: { usuario: true },
    });
  }

  async update(id: number, data: UpdatePedidoDTO) {
    return prisma.pedido.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await prisma.pedido.delete({
      where: { id },
    });
  }
}
