import { getCustomRepository, Repository } from "typeorm"
import { Review } from "../database/entities/Review";
import { ReviewsRepository } from "../repositories/ReviewsRepository";

type Data = {
    title:string;
    body:string;
    rate:number
}

export class ReviewService {
    private reviewsRepository: Repository<Review>;

    constructor() {
        this.reviewsRepository = getCustomRepository(ReviewsRepository);
    }

    async setReview(user_id:number, barber_id:number, data:Data) {
        try {
           const review = await this.reviewsRepository.create({
               user_id,
               barber_id,
               title: data.title,
               body: data.body,
               rate: data.rate
           }) 

           await this.reviewsRepository.save(review);

           return review;

        } catch (err) {
            return err;
        }
    }

    async getReviewByUserAndBarber(user_id:number, barber_id:number) {
        try {
            const review = await this.reviewsRepository.find({
                where:[{
                    user_id: user_id,
                    barber_id: barber_id
                }]
            })

            return review;

        } catch (err) {
            return err
        }
    }

    async updateReview(id:number, data:Data) {
        try {
           await this.reviewsRepository.update(id, {
               title: data.title,
               body: data.body,
               rate: data.rate
           })
           
           return;
        } catch (err) {
            return err;
        }
    }
}