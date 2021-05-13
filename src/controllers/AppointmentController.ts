import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AvailabilityRepository } from "../repositories/AvailabilityRepository";
import jwt from 'jsonwebtoken';
import { AppointmentService } from "../services/AppointmentService";
import { BarberService } from "../services/BarberService";
import { ServicesService } from "../services/ServicesService";

export class AppointmentController {
    async setAppointment(request:Request, response:Response) {
        const barberService = new BarberService();
        const serviceServices = new ServicesService();
        const appointmentsService = new AppointmentService();

        const availabilityRepository = getCustomRepository(AvailabilityRepository);
        const id = request.params.id;
        const { service_id, year, month, day, hour } = request.body;
        const token = request.headers.authorization;

        (month < 10) ? '0' + month : month;
        (day < 10) ? '0' + day : day;
        (hour < 10) ? '0' + hour : hour;

        try {
            const loggedUser = jwt.decode(token);

            const barber = await barberService.getBarberById(id);
            
            const service = await serviceServices.getServiceByBarber(service_id, barber['id']);

            if(service.length > 0) {
                const appDate = `${year}-${month}-${day} ${hour}:00:00`;

                if(Date.parse(appDate) > 0) {
                    const appointments = await appointmentsService.getAppointmentsByBarberId(barber['id'], appDate);

                    if(appointments.length > 0) {
                        return response.status(400).json({error: 'Date unavailable'})
                        
                    } else {
                        const availables = await availabilityRepository.find({
                            where:[
                                {
                                    barber_id: barber['id'],
                                    weekday: appDate
                                }
                                
                            ]
                        })

                        if(availables.length > 0) {
                            availables.map(avail => {
                                if(avail.hours.includes(hour)) {
                                    const newAppointment = appointmentsService.setAppointment(loggedUser['id'], barber['id'], service_id, appDate);
    
                                    return response.status(201).json(newAppointment);
                                } else {
                                    return response.status(400).json({error: "hour unavailable"})
                                }
                            })
                            
                        } else {
                            return response.status(400).json({ error: 'Barber unavailable' });
                        }
                    }

                } else {
                    return response.status(400).json({ error: 'Invalid date' });
                }
            } else {
                return response.status(400).json({ error: 'Service not exists!' });
            }
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }
}