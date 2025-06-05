import jwt from 'jsonwebtoken';
import { CustomError } from './custom.error';

// interface para el tipado del payload del token
// agregar datos si cambian en el futuro
export interface JwtPayload {
	id: number;
	email: string;
}

export const generateToken = (payload: JwtPayload): string => {
	// 1. Cargamos el JWT_SECRET desde las variables de entorno
	// Si no existe, lanzamos un error
	const JWT_SECRET = process.env.JWT_SECRET;
	if (!JWT_SECRET) {
		throw CustomError.internal('Error interno del servidor: code_1');
	}

	// 2. Verificamos que el payload tenga los campos necesarios
	if (!payload.id || !payload.email) {
		throw CustomError.internal('Error interno del servidor: code_2');
	}

	// 3. Generamos el token con la lib jsonwebtoken
	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
	return token;
};

export const verifyToken = (token: string): JwtPayload => {
	// 1. Cargamos el JWT_SECRET desde las variables de entorno
	// Si no existe, lanzamos un error
	const JWT_SECRET = process.env.JWT_SECRET;
	if (!JWT_SECRET) {
		throw CustomError.internal('Error interno del servidor: code_1');
	}

	// 2. Verificamos que el token no sea null o undefined
	if (!token) {
		throw CustomError.unauthorized('Token is missing');
	}
	// 3. Verificamos el token
	try {
		return jwt.verify(token, JWT_SECRET) as JwtPayload;
	} catch (error) {
		throw CustomError.unauthorized('Invalid or expired token');
	}
};
