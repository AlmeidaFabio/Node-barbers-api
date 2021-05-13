import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserService } from "../services/UserService";
import { BarberService } from "../services/BarberService";

export class AuthController {
    async login(request:Request, response:Response) {
        const usersService = new UserService();
        const { email, password } = request.body;

        try {
            const user = await usersService.getUserByEmail(email);
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

    async barberLogin(request:Request, response:Response) {
        const barberService = new BarberService();

        const { email, password } = request.body;

        try {
            const barber = await barberService.getBarberByEmail(email);

            if(!barber) {
                return response.status(400).json({error: 'Barber not found'});
            }

            if(!await bcrypt.compare(password.toString(), barber.password)) {
                return response.status(400).json({error: 'Invalid password'});
            }

            const token = jwt.sign({id:barber.id}, process.env.Secret, {
                expiresIn:86400
            })

            return response.json({id:barber.id, token});

        } catch (err) {
            return response.status(403).json({error:err});
        }
    }

}