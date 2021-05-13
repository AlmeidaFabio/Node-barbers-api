import { getCustomRepository, Repository } from "typeorm";
import { Favorite } from "../database/entities/Favorite";
import { FavoriteRepository } from "../repositories/FavoriteRepository";

export class FavoriteService {
    private favoritesRepository: Repository<Favorite>;

    constructor() {
        this.favoritesRepository = getCustomRepository(FavoriteRepository);
    }

    async setFavorite(user_id:number, barber_id:number) {
        try {
            const favorite = this.favoritesRepository.create({
               user_id,
               barber_id
           }) 

           await this.favoritesRepository.save(favorite);

           return favorite;

        } catch (err) {
            return err;
        }
    }

    async removeFavorite(id:number) {
        try {
            await this.favoritesRepository.delete(id);

            return;

        } catch (err) {
            return err;
        }
    }

    async getFavoriteByUserIdAndBarberId(user_id:number, barber_id:number) {
        try {
            const favorite = await this.favoritesRepository.find({
                where:[
                    {
                        user_id: user_id,
                        barber_id: barber_id
                    }
                ]
            }) 

            return favorite;

        } catch (err) {
            return err;
        }
    }

    async getUserFavorites(id:number) {
        try {
           const favorites = await this.favoritesRepository.find({
               where:[{
                   user_id: id
               }]
           })
           
           return favorites;

        } catch (err) {
            return err;
        }
    }
}