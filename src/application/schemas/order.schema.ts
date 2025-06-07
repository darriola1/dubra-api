import { z } from "zod";

export const orderschema = z.object({
  descripcion: z.string().min(1),
  pickupAddress: z.string().min(1),
  dropoffAddress: z.string().min(1),
  usuarioId: z.number().int(),
  status: z.enum(["pendiente", "en_camino", "entregado", "cancelado"]),
});

export const PedidoUpdateSchema = orderschema.partial();

export type PedidoInput = z.infer<typeof orderschema>;
export type PedidoUpdateInput = z.infer<typeof PedidoUpdateSchema>;
