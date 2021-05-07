import { EntityRepository, Repository } from "typeorm";
import { Photo } from "../database/entities/Photo";

@EntityRepository(Photo)
export class PhotosRepository extends Repository<Photo>{}