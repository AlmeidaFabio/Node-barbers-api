import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AvailbilityService } from "../services/AvailabilityService";

export class AvailabilityControler {
    async setAvailable(request:Request, response:Response) {
        const availabilityService = new AvailbilityService();

        const token = request.headers.authorization;

        const { year, month, day, hour } = request.body;

        (month < 10) ? '0' + month : month;
        (day < 10) ? '0' + day : day;
        (hour < 10) ? '0' + hour : hour;

        try {
            const loggedBarber = jwt.decode(token);

            const availDate = `${year}-${month}-${day} ${hour}:00:00`;

            const hours = `${hour}:00:00`

            const availability = await availabilityService.getBarberAvailbilities(loggedBarber['id'], availDate, hours)

            if(availability.length > 0) {
                return response.status(400).json({error: 'Date unavailable'})
            } else {
                const avail = await availabilityService.setAvailability(loggedBarber['id'], availDate, hours);

                return response.status(201).json(avail)
            }
        } catch (err) {
            return response.status(400).json({error:err});
        }
    }
}