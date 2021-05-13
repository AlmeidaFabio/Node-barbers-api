import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BarberService } from "../services/BarberService";
export class BarberController {
    async create(request:Request, response:Response) {
        const barberService = new BarberService;

        const { originalname, filename } = request.file;

        const { name, lastname, email, password, address, whatsapp } = request.body;

        const hash = await bcrypt.hash(password.toString(), 10);

        const data = {
            name,
            lastname,
            email,
            password: hash,
            address,
            whatsapp
        };

        const cover = {
            filename: originalname,
            key: filename,
            url: `${process.env.BaseUrl}/images/covers/${filename}`,
            barber_id: null
        }

        try {
            const userExists = await barberService.getBarberByEmail(email);

           if(userExists) {
               return response.status(400).json({ error:"Barber already exists!" });
           } 

           const barber = await barberService.createBarber(data, cover);

           const token = jwt.sign({ id:barber.id }, process.env.Secret, { expiresIn:864000 });

           barber.password = undefined;

           return response.status(200).json({ barber, token });
        } catch (err) {
            return response.status(400).json({ error:err });
        }

    }

    async getBarbers(request:Request, response:Response) {
        const barberService = new BarberService;

        const { page = 1, limit = 16 } = request.query;

        try {
           const res = await barberService.getBarbers(page.toString(), limit.toString());
           
           res.barbers.map(barber => {
               barber.password = undefined;
           })

           return response.status(200).json({
               barbers: res.barbers,
               totalPages: Math.ceil(res.count / parseInt(limit.toString())),
               page
           });

        } catch (err) {
            return response.status(400).json({ error:err });
        }
    }

    async getBarber(request:Request, response:Response) { 
        const barberService = new BarberService;

        const id = request.params.id;

        try {
            if(id) {
                const barber = await barberService.getBarberById(id);

                barber.password = undefined;

                return response.json(barber);
            } else {
                return response.status(400).json({ error: 'barber not exists!' });
            }
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }

    async update(request:Request, response:Response) {
        const barberService = new BarberService;

        const { name, lastname, email, password, address, whatsapp } = request.body;

        const id = request.params.id;

        const token = request.headers.authorization;

        const hash = await bcrypt.hash(password.toString(), 10);

        const data = {
            name,
            lastname,
            email,
            password: hash,
            address,
            whatsapp
        };

        try {
            if(token) {
                const loggedUser = jwt.decode(token);

                if(id) {
                    if(id === loggedUser['id'].toString()) {
                        await barberService.updateBarber(id, data)

                        return response.json({msg: 'Barber successfully updated!'});
                    } else {
                        return response.status(400).json({error:'Unauthorized!'});
                    }
                } else {
                    return response.status(400).json({ error: "Barber not exists!" });
                }
            } else {
                return response.status(400).json({ error: "you need to be logged in to perform this action!" });
            }
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }

    async delete(request:Request, response:Response) {
        const barberService = new BarberService;

        const id = request.params.id;

        const token = request.headers.authorization;

        try {
            if(token) {
                const loggedUser = jwt.decode(token);

                if(id) {
                    if(id === loggedUser['id'].toString()) {
                        await barberService.deleteBarber(id);

                        return response.json({msg: 'Barber successfully deleted!'});
                    } else {
                        return response.status(400).json({error:'Unauthorized!'});
                    }
                } else {
                    return response.json({error:'Barber does not exists!'});
                }
            } else {
                return response.status(400).json({ error: "you need to be logged in to perform this action!" });
            }
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }
}