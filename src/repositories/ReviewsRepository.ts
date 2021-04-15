import { EntityRepository, Repository } from "typeorm";
import { Review } from "../database/entities/Review";

@EntityRepository(Review)
export class ReviewsRepository extends Repository<Review>{}