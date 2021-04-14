import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthController {
    async login(request:Request, response:Response) {
        const usersRepository = getCustomRepository(UsersRepository);
        const { email, password } = request.body;

        try {
            const user = await usersRepository.findOne({email}, {
                select:["id", "email", "password"]
            });

            if(!user) {
                return response.status(400).json({error: 'User not found'});
            }

            if(!await bcrypt.compare(password.toString(), user.password)) {
                return response.status(400).json({error: 'Invalid password'});
            }

            const token = jwt.sign({id:user.id}, process.env.Secret, {
                expiresIn:86400
            })

            return response.json({id:user.id, token});

        } catch (err) {
            return response.status(403).json({error:err});
        }
    }

}