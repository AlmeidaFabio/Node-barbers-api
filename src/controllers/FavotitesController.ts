import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { FavoriteService } from "../services/FavoriteService";
import { UserService } from "../services/UserService";
import { BarberService } from "../services/BarberService";

export class FavoritesController {
    async toggleFavorite(request:Request, response:Response) {
        const favoritesService = new FavoriteService();
        const usersService = new UserService();
        const barbersService = new BarberService();

        const barber_id = request.params.id;
        const token = request.headers.authorization;
        const loggedUser = jwt.decode(token);

        try {                        
            const user = await usersService.getUserById(loggedUser['id']);

            const barber = await barbersService.getBarberById(barber_id);

            if(barber) {
                const favorite = await favoritesService.getFavoriteByUserIdAndBarberId(user['id'], barber['id'])

                if(favorite.length > 0) {
                    const favoriteId = favorite.map(fav => fav.id)

                    await favoritesService.removeFavorite(favoriteId);

                    return response.json({favorited:false})

                } else {
                    await favoritesService.setFavorite(user['id'], barber['id']);


                    return response.json({favorited: true})
                }

            } else {
                return response.json({error:'Barber does not exists!'});
            }
             
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }

    async getFavorites(request:Request, response:Response) {
        const favoritesService = new FavoriteService();

        const token = request.headers.authorization;

        const loggedUser = jwt.decode(token);

        try {
            if(loggedUser) {
                const favorites = await favoritesService.getUserFavorites(loggedUser['id']);

                return response.status(200).json(favorites);
            } else {
                return response.status(400).json({error: 'Not allowed!'});
            }
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }
}