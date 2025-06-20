import { z } from '@/docs/zod-openapi'
import { InvoiceSchema } from '@/generated/zod/modelSchema/InvoiceSchema'

export const CreateInvoiceSchema = InvoiceSchema.pick({
  number: true,
  fileBase64: true,
  customerId: true
}).extend({
  fileBase64: z
    .string()
    .startsWith('data:application/pdf;base64,', 'Debe ser un archivo PDF en base64')
    .openapi({ example: 'data:application/pdf;base64,JVBERi0xLjQKJc...' }),
  number: z.string().min(1).openapi({ example: 'FAC-2025-001' }),
  customerId: z.number().int().openapi({ example: 1 })
});

export type CreateInvoiceDTO = z.infer<typeof CreateInvoiceSchema>;