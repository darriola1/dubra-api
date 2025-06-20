import { z } from '@/docs/zod-openapi';

export const CreateInvoiceSchema = z.object({
	number: z.string().min(1).openapi({ example: 'FAC-0001' }),
	fileBase64: z.string().startsWith('data:application/pdf;base64,', 'Debe ser un archivo PDF en base64').openapi({ example: 'data:application/pdf;base64,JVBERi0xLjQKJcTl8uXr...' }),
	customerId: z.number().int().openapi({ example: 1 }),
});
