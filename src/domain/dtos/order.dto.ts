export interface CreateOrderDTO {
  descripcion: string;
  pickupAddress: string;
  dropoffAddress: string;
  usuarioId: number;
  status: "pendiente" | "en_camino" | "entregado" | "cancelado";
}
export interface UpdateOrderDTO {
  descripcion?: string;
  status?: "pendiente" | "en_camino" | "entregado" | "cancelado";
}
