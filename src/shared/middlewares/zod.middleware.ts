import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

// Esta función recibe un schema (esquema de validación creado con Zod en user.schema)
export const validateBody = (schema: ZodSchema) => {
  // se retrona una funcion que Express va a usar como middleware
  return (req: Request, res: Response, next: NextFunction): void => {
    // se validan los datos del body contra el schema de zod
    const result = schema.safeParse(req.body);

    // Si la validación falla, devolvemos un error con status 400 (Bad Request)
    if (!result.success) {
      res.status(400).json({ errors: result.error.format() }); 
      return; // se sale de la función para no continuar, ya que los datos no son válidos
    }

    // Si los datos son válidos, los guardamos en req.body 
    req.body = result.data;
    // se llama a "next" para que continúe con la siguiente parte del proceso
    next();
  };
};
