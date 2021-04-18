import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppointmensRepository } from "../repositories/AppointmentsRepository";
import { AvailabilityRepository } from "../repositories/AvailabilityRepository";
import { BarbersRepository } from "../repositories/BarbersRepository";
import { ServicesRepository } from "../repositories/ServiceRepository";
import jwt from 'jsonwebtoken';

export class AppointmentController {
    async setAppointment(request:Request, response:Response) {
        const barbersRepository = getCustomRepository(BarbersRepository);
        const servicesRepository = getCustomRepository(ServicesRepository);
        const appointmentsRepository = getCustomRepository(AppointmensRepository);
        const availabilityRepository = getCustomRepository(AvailabilityRepository);
        const id = request.params.id;
        const { service_id, year, month, day, hour } = request.body;
        const token = request.body.token || request.query.token;

        (month < 10) ? '0' + month : month;
        (day < 10) ? '0' + day : day;
        (hour < 10) ? '0' + hour : hour;

        try {
            const loggedUser = jwt.decode(token);

            const user = loggedUser['id'];

            const barber = await barbersRepository.findOne(id);
            
            const service = await servicesRepository.find({
                where:[
                    {
                        id: service_id,
                        barber_id: barber.id
                    }
                ]
            });

            if(service.length > 0) {
                const appDate = `${year}-${month}-${day} ${hour}:00:00`;

                if(Date.parse(appDate) > 0) {
                    const appointments = await appointmentsRepository.find({
                        where:[
                            {
                                barber_id: barber.id,
                                ap_datetime: appDate
                            }
                        ]
                    });

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
                                    const newAppointment = appointmentsRepository.create({
                                        user_id: user,
                                        barber_id: barber.id,
                                        service_id,
                                        ap_datetime:appDate
                                    });
    
                                    appointmentsRepository.save(newAppointment);
    
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

    async getAppointments(request:Request, response:Response) {
        const appointmentsRepository = getCustomRepository(AppointmensRepository);
        const id = request.params.id;
        const token = request.body.token || request.query.token;

        const loggedUser = jwt.decode(token);

        try {
            if(id === loggedUser['id'].toString()) {
                const appointments = await appointmentsRepository.find({
                    where:[
                        {user_id: id}
                    ],
                    order:{ap_datetime:"DESC"},
                    relations:["barber", "barber.services"]
                })
    
                return response.json(appointments);
            } else {
                return response.status(400).json({error: 'Not allowed!'})
            }
            
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }
}