// imports de paquetes
import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// imports de codigo
import authRoutes from '@/infrastructure/http/routes/auth.routes';
// cargamos las vairables de entorno
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3003;

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true, 
}));

app.use(json());
// Se deshabilita el header 'x-powered-by' por "seguridad".
app.disable('x-powered-by');

app.get('/', (_req, res) => {
	res.send(`🚀 Dubra API funcionando correctamente ${PORT}`);
});

// Ruta base para autenticación
app.use('/auth', authRoutes);

// Solo escuchá si no estás en test
if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
	});
}

// Exportá la app para usarla en los tests
export default app;
