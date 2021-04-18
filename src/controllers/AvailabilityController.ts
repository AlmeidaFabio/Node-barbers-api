import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AvailabilityRepository } from "../repositories/AvailabilityRepository";
import jwt from 'jsonwebtoken';

export class AvailabilityControler {
    async setAvailable(request:Request, response:Response) {
        const availsRepository = getCustomRepository(AvailabilityRepository);
        const token = request.body.token || request.query.token;

        const { year, month, day, hour } = request.body;

        (month < 10) ? '0' + month : month;
        (day < 10) ? '0' + day : day;
        (hour < 10) ? '0' + hour : hour;

        try {
            const loggedBarber = jwt.decode(token);

            const availDate = `${year}-${month}-${day} ${hour}:00:00`;

            const hours = `${hour}:00:00`

            const availability = await availsRepository.find({
                where:[
                    {
                        barber_id: loggedBarber['id'],
                        weekday: availDate,
                        hours: hours
                    }
                ]
            })

            if(availability.length > 0) {
                return response.status(400).json({error: 'Date unavailable'})
            } else {
                const avail = availsRepository.create({
                    barber_id: loggedBarber['id'],
                    weekday: availDate,
                    hours
                })

                await availsRepository.save(avail)

                return response.status(201).json(avail)
            }
        } catch (err) {
            return response.status(400).json({error:err});
        }
    }
}