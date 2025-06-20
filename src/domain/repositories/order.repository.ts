import { CreateOrderDTO, UpdateOrderDTO } from '@/application/schemas/order.schema';

export interface IOrderRepository {
	create(data: CreateOrderDTO): Promise<any>;
	findAll(): Promise<any[]>;
	findById(id: number): Promise<any | null>;
	update(id: number, data: UpdateOrderDTO): Promise<any>;
	delete(id: number): Promise<void>;
}
