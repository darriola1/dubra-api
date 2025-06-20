import { CreateInvoiceDTO } from '@/application/schemas/invoice.schema';

export interface IInvoiceRepository {
  create(data: Omit<CreateInvoiceDTO, 'id' | 'createdAt'>): Promise<CreateInvoiceDTO>
  findById(id: number): Promise<CreateInvoiceDTO | null>
}