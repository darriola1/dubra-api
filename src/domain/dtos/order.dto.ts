export interface CreatePedidoDTO {
  descripcion: string;
  pickupAddress: string;
  dropoffAddress: string;
  usuarioId: number;
  status: "pendiente" | "en_camino" | "entregado" | "cancelado";
}
export interface UpdatePedidoDTO {
  descripcion?: string;
  status?: "pendiente" | "en_camino" | "entregado" | "cancelado";
}
