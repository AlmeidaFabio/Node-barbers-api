import { Request, Response } from "express";
import { PhotoService } from "../services/PhotoService";
import jwt from 'jsonwebtoken';

export class PhotosController {
    async uploadPhotos(request:Request, response:Response) {
        const photoService = new PhotoService();

        const token = request.headers.authorization;

        const { originalname, filename } = request.file;

        const loggedBarber = jwt.decode(token);

        const photo = {
            filename: originalname,
            key: filename,
            url: `${process.env.BaseUrl}/uploads/photos/${filename}`
        }

        try {
            const photos = await photoService.uploadPhotos(photo, loggedBarber['id']);

            return response.status(201).json(photos);
        } catch (err) {
            return response.status(400).json({error: err});
        }
    }
}