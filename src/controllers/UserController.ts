import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController {
    async create(request:Request, response:Response) {
        const usersRepository = getCustomRepository(UsersRepository);

        const { name, lastname, email, password, address, whatsapp } = request.body;

        const hash = await bcrypt.hash(password.toString(), 10);

        const userExists = await usersRepository.findOne({ email });

        try {
           if(userExists) {
               return response.status(400).json({ error:"User already exists!" });
           } 

           const user = usersRepository.create({
               name,
               lastname,
               email,
               password:hash,
               address,
               whatsapp
           });

           await usersRepository.save(user);

           const token = jwt.sign({ id:user.id }, process.env.Secret, { expiresIn:864000 });

           user.password = undefined;

           return response.status(200).json({ user, token });
        } catch (err) {
            return response.status(400).json({ error:err });
        }

    }
}