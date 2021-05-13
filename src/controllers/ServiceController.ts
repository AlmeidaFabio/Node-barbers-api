import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { BarberService } from "../services/BarberService";
import { ServicesService } from "../services/ServicesService";

export class ServiceController {
    async setService(request:Request, response:Response) {
        const servicesService = new ServicesService();

        const token = request.headers.authorization;
        const { name, price } = request.body;

        try {
           const loggedBarber = jwt.decode(token);
           
           const barber_id = loggedBarber['id'];

           const service = await servicesService.createService(barber_id, name, price);

           return response.status(201).json(service)

        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }

    async deleteService(request:Request, response:Response) {
        const servicesService = new ServicesService();
        const barberSerrvice = new BarberService();
        const token = request.headers.authorization;
        const id = parseInt(request.params.id);
        const loggedBarber = jwt.decode(token);

        try {
            const service = await servicesService.getServiceById(id);
            const barber = await barberSerrvice.getBarberById(loggedBarber['id']);

            if(service && service['barber_id'] === barber['id']) {
                await servicesService.deleteService(id);

                return response.status(200).json({msg: 'Service successfully deleted'})
            } else {
                return response.status(200).json({error: 'Not authorized'})
            }
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }
}