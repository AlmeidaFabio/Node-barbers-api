import { getCustomRepository, Like } from "typeorm"
import { BarbersRepository } from "../repositories/BarbersRepository";

export class SearchService {
    async searchBarber(text:string) {
        const barbersRepository = getCustomRepository(BarbersRepository);

        const result = await barbersRepository.find({
            where:[{
                name: Like(`${text}%`)
            }],
            relations:["cover", "photos"]
        })

        return result;
    }
}