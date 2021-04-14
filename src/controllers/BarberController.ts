import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BarbersRepository } from "../repositories/BarbersRepository";

export class BarberController {
    async create(request:Request, response:Response) {
        const barbersRepository = getCustomRepository(BarbersRepository);

        const { name, lastname, email, password, address, whatsapp } = request.body;

        const hash = await bcrypt.hash(password.toString(), 10);

        const userExists = await barbersRepository.findOne({ email });

        try {
           if(userExists) {
               return response.status(400).json({ error:"User already exists!" });
           } 

           const barber = barbersRepository.create({
               name,
               lastname,
               email,
               password:hash,
               address,
               whatsapp
           });

           await barbersRepository.save(barber);

           const token = jwt.sign({ id:barber.id }, process.env.Secret, { expiresIn:864000 });

           barber.password = undefined;

           return response.status(200).json({ barber, token });
        } catch (err) {
            return response.status(400).json({ error:err });
        }

    }

    async readAll(request:Request, response:Response) {
        const barbersRepository = getCustomRepository(BarbersRepository);

        try {
           const barbers = await barbersRepository.find();
           
           barbers.map(barber => {
               barber.password = undefined;
           })
           return response.json(barbers);

        } catch (err) {
            return response.status(400).json({ error:err });
        }
    }
}