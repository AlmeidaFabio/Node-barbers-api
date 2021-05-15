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

    async getBarberAvailabilities(barber_id:string) {
        try {
            const barberAvailabilities = await this.availabilitiesRepository.find({
                where:[{
                    barber_id: barber_id  
                }]
            })

            return barberAvailabilities;
            
        } catch (err) {
            return err
        }
    }

    async getBarberAvailbilitieByDateAndHour(id:number, avaiDate:string, hours:string) {
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

    async getAvailabilityByBarberAndWeedDay(barber_id:number, weekday:string) {
        try {
            const availability = await this.availabilitiesRepository.find({
                where:[{
                    barber_id: barber_id,
                    weekday: weekday
                }]
            })

            return availability;

        } catch (err) {
            return err;
        }
    }
}