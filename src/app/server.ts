// imports de paquetes
import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// imports de servicios
import { logger } from '@/shared/utils/logger';
// imports de codigo
import authRoutes from '@/infrastructure/http/routes/auth.routes';
import userRoutes from '@/infrastructure/http/routes/user.routes';
import ordersRouter from '@/infrastructure/http/routes/order.routes';
import { errorHandler } from '@/shared/middlewares/error.middleware';

import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from '../docs/openapi';

// cargamos las vairables de entorno
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3003;

app.use(
	cors({
		origin: 'http://localhost:3001',
		credentials: true,
	})
);

app.use(json());
//habilit en express la lectura de cookies
app.use(cookieParser());
// Se deshabilita el header 'x-powered-by' por "seguridad".
app.disable('x-powered-by');

app.get('/', (_req, res) => {
	res.send(`🚀 Dubra API funcionando correctamente ${PORT}`);
});

// Ruta base para autenticación
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
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
