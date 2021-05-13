import { getCustomRepository, Repository } from "typeorm";
import { Appointment } from "../database/entities/Appointment";
import { AppointmensRepository } from "../repositories/AppointmentsRepository";

export class AppointmentService {
    private appointmentsRepository: Repository<Appointment>;

    constructor() {
        this.appointmentsRepository = getCustomRepository(AppointmensRepository);
    }

    async setAppointment(user_id:number, barber_id:number, service_id:number, appDate:string) {
        try {
            const app = this.appointmentsRepository.create({
                user_id,
                barber_id,
                service_id,
                ap_datetime: appDate
            })

            await this.appointmentsRepository.save(app);

            return app;
            
        } catch (err) {
            return err;
        }
    }

    async getAppointmentsByBarberId(barber_id:number, date:string) {
        try {
            const appointments = await this.appointmentsRepository.find({
                where:[{
                    barber_id,
                    ap_datetime: date
                }]
            })

            return appointments;

        } catch (err) {
            return err;
        }
    }
}