import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { ReviewService } from "../services/ReviewService";
import { BarberService } from "../services/BarberService";

export class ReviewsController {
    async  setReview(request:Request, response:Response) {
        const reviewsService = new ReviewService();
        const barberService = new BarberService();

        const id = request.params.id;
        const { title, body, rate } = request.body;
        const token = request.headers.authorization;

        const data = {
            title,
            body,
            rate
        }

        try {
            const loggedUser = jwt.decode(token);
            const barber = await barberService.getBarberById(id);

            if(barber) {
                const review = await reviewsService.getReviewByUserAndBarber(loggedUser['id'], barber['id']);
    
                if(review.length > 0) {
                    const reviewId = review.map(rev => rev.id);
    
                    await reviewsService.updateReview(reviewId, data)
    
                    return response.json({msg: 'Review successfully updated!'});
                } else {
                    const newReview = await reviewsService.setReview(loggedUser['id'], barber['id'], data);
    
                    return response.json(newReview);
                }
            } else {
                return response.status(400).json({error: 'Barber not exists!'})
            }
        } catch (err) {
            return response.status(400).json({error:err});
        }
    }
}