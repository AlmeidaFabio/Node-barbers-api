import { getCustomRepository, Repository } from "typeorm";
import { Photo } from "../database/entities/Photo";
import { PhotosRepository } from "../repositories/PhotosRepository";

type Image = {
    filename: string;
    key: string;
    url: string;
}

export class PhotoService {
    private photosRepository: Repository<Photo>;

    constructor() {
        this.photosRepository = getCustomRepository(PhotosRepository);
    }

    async uploadPhotos(photo: Image, barber_id: number) {
        try {
           const photos = this.photosRepository.create({
               filename: photo.filename,
               key: photo.key,
               url: photo.url,
               barber_id
           })

           await this.photosRepository.save(photos);

           return photos;
           
        } catch (err) {
            return err;
        }
    }
}