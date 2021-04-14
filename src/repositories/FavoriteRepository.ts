import { EntityRepository, Repository } from "typeorm";
import { Favorite } from "../database/entities/Favorite";

@EntityRepository(Favorite)
export class FavoriteRepository extends Repository<Favorite>{}