import { getCustomRepository, Repository } from "typeorm";
import { Barber } from "../database/entities/Barber";
import { BarberCover } from "../database/entities/BarberCover";
import { BarberCoverRepository } from "../repositories/BarberCoverRepository";
import { BarbersRepository } from "../repositories/BarbersRepository";

type Data = {
    name:string;
    lastname:string;
    email:string;
    password:string;
    address:string;
    whatsapp:string;
}

type File = {
    filename:string;
    key:string;
    url:string;
    barber_id:number;
}

export class BarberService {
    private barbersRepository: Repository<Barber>;
    private coversRepository: Repository<BarberCover>;

    constructor() {
        this.barbersRepository = getCustomRepository(BarbersRepository);
        this.coversRepository = getCustomRepository(BarberCoverRepository);
    }

    async getBarberByEmail(email:string) {
        try {
            const barber = await this.barbersRepository.findOne({
                where:[{
                    email
                }],
                select:["id", "email", "password"]
            });

            return barber;

        } catch (err) {
            return err;
        }
    }

    async createBarber(data:Data, cover:File) {
        try {
           const barber = this.barbersRepository.create(data);

           await this.barbersRepository.save(barber);
            
           cover.barber_id = barber.id;

           const img = this.coversRepository.create(cover);

           await this.coversRepository.save(img);

           return barber;

        } catch (err) {
            return err
        }
    }

    async getBarbers(page:string, limit:string) {
        try {
            const barbers = await this.barbersRepository.find({
                relations:["cover", "availability", "reviews", "services", "photos"],
                order:{name: "ASC"},
                take:(parseInt(limit) * 1),
                skip:((parseInt(page) - 1) * parseInt(limit))
            })

            const count = barbers.length;

            return {barbers, count};

        } catch (err) {
            return err
        }
    }

    async getBarberById(id:string) {
        try {
           const barber = await this.barbersRepository.findOne(id, {
               relations:["cover", "availability", "reviews", "services", "photos"]
           }) 

           return barber;

        } catch (err) {
            return err
        }
    }

    async updateBarber(id:string, data:Data) {
        try {
            await this.barbersRepository.update(id, {
                name:data.name,
                lastname:data.lastname,
                password:data.password,
                address:data.address,
                whatsapp:data.whatsapp
            })

            return;

        } catch (err) {
            return err
        }
    }

    async deleteBarber(id:string) {
        try {
            await this.barbersRepository.delete(id);

            return;
        } catch (err) {
            return err
        }
    }
}