import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ServicesRepository } from "../repositories/ServiceRepository";
import jwt from 'jsonwebtoken';

export class ServiceController {
    async setService(request:Request, response:Response) {
        const servicesRepository = getCustomRepository(ServicesRepository);
        const token = request.body.token || request.query.token;
        const { name, price } = request.body;

        try {
           const loggedUser = jwt.decode(token);
           
           const barber_id = loggedUser['id'];

           const service = servicesRepository.create({
               barber_id,
               name,
               price
           })

           await servicesRepository.save(service);

           return response.status(201).json(service)

        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }
}