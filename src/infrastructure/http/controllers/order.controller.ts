import { Request, Response } from "express";
import { orderschema, PedidoUpdateSchema } from "../../../application/schemas/order.schema";
import { PedidoDatasource } from "../../data/prisma/order.datasource";

// Importación de los use cases
import { CreatePedidoUseCase } from "../../../application/use-cases/order/create-order.use-case";
import { FindAllPedidosUseCase } from "../../../application/use-cases/order/find-all-orders.use-case";
import { FindPedidoByIdUseCase } from "../../../application/use-cases/order/find-order-by-id.use-case";
import { UpdatePedidoUseCase } from "../../../application/use-cases/order/update-order.use-case";
import { DeletePedidoUseCase } from "../../../application/use-cases/order/delete-order.use-case";

const pedidoRepo = new PedidoDatasource();

export class PedidoController {
  async create(req: Request, res: Response) {
    const parsed = orderschema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.flatten());

    const useCase = new CreatePedidoUseCase(pedidoRepo);
    const pedido = await useCase.execute(parsed.data);
    res.status(201).json(pedido);
  }

  async findAll(req: Request, res: Response) {
    const useCase = new FindAllPedidosUseCase(pedidoRepo);
    const pedidos = await useCase.execute();
    res.json(pedidos);
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const useCase = new FindPedidoByIdUseCase(pedidoRepo);
    const pedido = await useCase.execute(id);
    if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(pedido);
  }

  async upgrade(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const parsed = PedidoUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.flatten());

    const useCase = new UpdatePedidoUseCase(pedidoRepo);
    const pedido = await useCase.execute(id, parsed.data);
    res.json(pedido);
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const useCase = new DeletePedidoUseCase(pedidoRepo);
    await useCase.execute(id);
    res.status(204).send();
  }
}
