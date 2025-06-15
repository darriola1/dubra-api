// imports de paquetes
import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// imports de servicios
import { logger } from '@/shared/utils/logger';
import { errorHandler } from '../shared/middlewares/error.middleware';
import { httpLogger } from '@/shared/middlewares/http-logger.middleware';

// imports de codigo
import authRoutes from '@/infrastructure/http/routes/auth.routes';
import userRoutes from '@/infrastructure/http/routes/user.routes';
import ordersRouter from '@/infrastructure/http/routes/order.routes';

import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from '../docs/openapi';

// cargamos las vairables de entorno
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3003;

// Configuración de CORS
// Agregar ruta del front cuando este deployado
app.use(
	cors({
		origin: 'http://localhost:3001',
		credentials: true,
	})
);
// habilitamos el parseo de json
app.use(json());
//habilit en express la lectura de cookies
app.use(cookieParser());
// Se deshabilita el header 'x-powered-by' por "seguridad".
app.disable('x-powered-by');
// Ruta base para verificar que la API está funcionando
app.get('/', (_req, res) => {
	res.send(`🚀 Dubra API funcionando correctamente ${PORT}`);
});
// Middleware de logging HTTP
app.use(httpLogger);
// Ruta base
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/orders', ordersRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use(errorHandler);

// Solo escuchá si no estás en test
if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		// console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
		logger.info(`Servidor escuchando en http://localhost:${PORT}`);
	});
}

// Exportá la app para usarla en los tests
export default app;
