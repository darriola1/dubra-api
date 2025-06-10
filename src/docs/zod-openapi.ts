// src/libs/zod-openapi.ts
import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export { z }; // Ahora este `z` tiene `.openapi(...)`
