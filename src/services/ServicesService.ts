import { getCustomRepository, Repository } from "typeorm";
import { Service } from "../database/entities/Service";
import { ServicesRepository } from "../repositories/ServiceRepository";

export class ServicesService {
    private servicesRepository: Repository<Service>;

    constructor() {
        this.servicesRepository = getCustomRepository(ServicesRepository);
    }

    async createService(barber_id:number, name:string, price:number) {
        try {
            const service = this.servicesRepository.create({
                barber_id,
                name,
                price
            })

            await this.servicesRepository.save(service);

            return service;
            
        } catch (err) {
            return err;
        }
    }

    async getServiceById(id:number) {
        try {
           const service = await this.servicesRepository.findOne(id);
           
           return service;
           
        } catch (err) {
            return err;
        }
    }

    async deleteService(id:number) {
        try {
            await this.servicesRepository.delete(id);

            return;
        } catch (err) {
            return err;
        }
    }

    async getServiceByBarber(id:number, barber_id:number) {
        try {
            const service = await this.servicesRepository.find({
                where:[{
                    id,
                    barber_id
                }]
            })

            return service;
        } catch (err) {
            return err;
        }
    }
}