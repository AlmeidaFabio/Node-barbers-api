import { getCustomRepository, Repository } from "typeorm";
import { Availability } from "../database/entities/Availability";
import { AvailabilityRepository } from "../repositories/AvailabilityRepository";

export class AvailbilityService {
    private availabilitiesRepository: Repository<Availability>;

    constructor() {
        this.availabilitiesRepository = getCustomRepository(AvailabilityRepository);
    }

    async setAvailability(id:number, avaiDate:string, hours:string) {
        try {
            const availability = this.availabilitiesRepository.create({
                barber_id: id,
                weekday: avaiDate,
                hours
            })

            await this.availabilitiesRepository.save(availability);

            return availability;
            
        } catch (err) {
            return err;
        }
    }

    async getBarberAvailbilities(id:number, avaiDate:string, hours:string) {
        try {
            const availability = await this.availabilitiesRepository.find({
                where:[{
                    barber_id: id,
                    weekday: avaiDate,
                    hours: hours
                }]
            })

            return availability;

        } catch (err) {
            return err;
        }
    }
}