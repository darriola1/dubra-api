import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos por IP
  standardHeaders: true, // Devuelve los headers estándar de rate limit
  legacyHeaders: false,  // Desactiva los headers X-RateLimit
  message: {
    error: 'Demasiados intentos. Por favor, inténtalo de nuevo más tarde.'
  }
});