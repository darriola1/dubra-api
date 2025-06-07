import { Request, Response } from "express";
import { orderschema, OrderUpdateSchema } from "../../../application/schemas/order.schema";
import { OrderDatasource } from "../../data/prisma/order.datasource";

// Importación de los use cases
import { CreateOrderUseCase } from "../../../application/use-cases/order/create-order.use-case";
import { FindAllOrdersUseCase } from "../../../application/use-cases/order/find-all-orders.use-case";
import { FindOrderByIdUseCase } from "../../../application/use-cases/order/find-order-by-id.use-case";
import { UpdateOrderUseCase } from "../../../application/use-cases/order/update-order.use-case";
import { DeleteOrderUseCase } from "../../../application/use-cases/order/delete-order.use-case";

const orderRepo = new OrderDatasource();

export class OrderController {
  async create(req: Request, res: Response) {
    const parsed = orderschema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.flatten());

    const useCase = new CreateOrderUseCase(orderRepo);
    const order = await useCase.create(parsed.data);
    res.status(201).json(order);
  }

  async findAll(req: Request, res: Response) {
    const useCase = new FindAllOrdersUseCase(orderRepo);
    const orders = await useCase.findAll();
    res.json(orders);
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const useCase = new FindOrderByIdUseCase(orderRepo);
    const order = await useCase.findBy(id);
    if (!order) return res.status(404).json({ error: "Order no encontrado" });
    res.json(order);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const parsed = OrderUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.flatten());

    const useCase = new UpdateOrderUseCase(orderRepo);
    const order = await useCase.update(id, parsed.data);
    res.json(order);
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const useCase = new DeleteOrderUseCase(orderRepo);
    await useCase.delete(id);
    res.status(204).send();
  }
}
