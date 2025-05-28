import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

export const createSwaggerAdapter = (): Router => {
  const router = Router();

  const swaggerPath: string = path.resolve(__dirname, 'openapi.yaml');
  const swaggerDocument = YAML.load(swaggerPath);

  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return router;
};
