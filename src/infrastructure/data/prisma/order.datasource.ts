import { PrismaClient } from "../../../generated/prisma/client";  
import { OrderRepository } from "@/domain/repositories/order.repository";
import { CreateOrderDTO, UpdateOrderDTO } from "@/domain/dtos/order.dto";

const prisma = new PrismaClient();

export class OrderDatasource implements OrderRepository {
  async create(data: CreateOrderDTO) {
    return prisma.order.create({
      data,
    });
  }

  async findAll() {
    return prisma.order.findMany({
      include: { user: true },
    });
  }

  async findById(id: number) {
    return prisma.order.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async update(id: number, data: UpdateOrderDTO) {
    return prisma.order.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await prisma.order.delete({
      where: { id },
    });
  }
}
