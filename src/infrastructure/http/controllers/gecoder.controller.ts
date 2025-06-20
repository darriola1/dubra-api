import { geocodeAddress } from "@/infrastructure/proxies/geocoder.proxy";
import { CustomError } from "@/shared/utils/custom.error";
import { Request, Response } from "express";


export class GeocoderController{

    async find(req: Request, res: Response){
        
        try{
            const address = req.query.q as string;
            console.log(address);
            if(!address){
                res.status(404).json({ error: 'Dirección no existe' });
                return;
            }
            
            const location = await geocodeAddress(address);
            res.json(location)
            if (location.length === 0) {
                throw new Error('No se encontraron resultados');
            }
            if (location.length > 1) {
                throw new Error('Demasiadas posibilidades');
            }

        } catch(error){
            const message = error instanceof CustomError ? error.message : 'Unexpected error';
            const status = error instanceof CustomError ? error.statusCode : 500;

            res.status(status).json({ error: message });
        }
    }
    async findAll(req: Request, res: Response){
        try{
            const { address } = req.body;

            if(!address){
                res.status(404).json({ error: 'Dirección no existe' });
                return;
            }
            
            const location = await geocodeAddress(address);
            res.json(location)
            if (location.length === 0) {
                throw new Error('No se encontraron resultados');
            }

        } catch(error){
            const message = error instanceof CustomError ? error.message : 'Unexpected error';
            const status = error instanceof CustomError ? error.statusCode : 500;

            res.status(status).json({ error: message });
        }
    }

}