import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ReviewsRepository } from "../repositories/ReviewsRepository";
import jwt from 'jsonwebtoken';
import { BarbersRepository } from "../repositories/BarbersRepository";

export class ReviewsController {
    async  setReview(request:Request, response:Response) {
        const reviewsRepository = getCustomRepository(ReviewsRepository);
        const barbersRepository = getCustomRepository(BarbersRepository);
        const id = request.params.id;
        const { title, body, rate } = request.body;
        const token = request.body.token || request.query.token;

        try {
            const loggedUser = jwt.decode(token);
            const barber = await barbersRepository.findOne(id);

            if(barber) {
                const review = await reviewsRepository.find({
                    where:[
                        {
                            user_id: loggedUser['id'],
                            barber_id: barber['id']
                        }
                    ]
                })
    
                if(review.length > 0) {
                    const reviewId = review.map(rev => rev.id);
    
                    await reviewsRepository.update(reviewId, {
                        title,
                        body,
                        rate
                    })
    
                    return response.json({msg: 'Review successfully updated!'});
                } else {
                    const newReview = reviewsRepository.create({
                        user_id:loggedUser['id'],
                        barber_id: barber.id,
                        title,
                        body,
                        rate
                    })
    
                    await reviewsRepository.save(newReview);
    
                    return response.json(newReview);
                }
            } else {
                return response.status(400).json({error: 'Barber not exists!'})
            }
        } catch (err) {
            return response.status(400).json({error:err});
        }
    }

    async getBarberReviews(request:Request, response:Response) {
        const reviewsRepository = getCustomRepository(ReviewsRepository);
        const barbersRepository = getCustomRepository(BarbersRepository);
        const id = request.params.id;

        try {
           const barber = await barbersRepository.findOne(id);

           if(barber) {
                const reviews = await reviewsRepository.find({
                    where:[
                        {
                            barber_id: barber.id
                        }
                    ]
                })

                return response.json(reviews);
           } else {
                return response.status(400).json({error: 'Barber not exists!'})
           }
        } catch (err) {
            return response.status(400).json({error:err})
        }
    }
}