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

    async readAll(request:Request, response:Response) {
        const usersRepository = getCustomRepository(UsersRepository);

        try {
           const users = await usersRepository.find({
               relations:["favorites", "appointments"]
           });
           
           users.map(user => {
               user.password = undefined;
           })
           return response.json(users);

        } catch (err) {
            return response.status(400).json({ error:err });
        }
    }

    async readOne(request:Request, response:Response) {
        const usersRepository = getCustomRepository(UsersRepository);
        
        const id = request.params.id;

        try {
            if(id) {
                const user = await usersRepository.findOne(id, {
                    relations:["favorites", "appointments"]
                });

                user.password = undefined;

                return response.json(user);
            } else {
                return response.status(400).json({ error: 'This user not exists!' });
            }
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }

    async update(request:Request, response:Response) {
        const usersRepository = getCustomRepository(UsersRepository);

        const { name, lastname, password, address, whatsapp } = request.body;

        const id = request.params.id;

        const token = request.body.token || request.query.token;

        const hash = await bcrypt.hash(password.toString(), 10);

        try {
            if(token) {
                const loggedUser = jwt.decode(token);

                if(id) {
                    if(id === loggedUser['id'].toString()) {
                        await usersRepository.update(id, {
                            name,
                            lastname,
                            password:hash,
                            address,
                            whatsapp
                        })

                        return response.json({msg: 'User successfully updated!'});
                    } else {
                        return response.status(400).json({error:'Unauthorized!'});
                    }
                } else {
                    return response.status(400).json({ error: "User not exists!" });
                }
            } else {
                return response.status(400).json({ error: "you need to be logged in to perform this action!" });
            }
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }

    async delete(request:Request, response:Response) {
        const usersRepository = getCustomRepository(UsersRepository);

        const id = request.params.id;

        const token = request.body.token || request.query.token;

        try {
            if(token) {
                const loggedUser = jwt.decode(token);

                if(id) {
                    if(id === loggedUser['id'].toString()) {
                        await usersRepository.delete(id);

                        return response.json({msg: 'User successfully deleted!'});
                    } else {
                        return response.status(400).json({error:'Unauthorized!'});
                    }
                } else {
                    return response.json({error:'User does not exists!'});
                }
            } else {
                return response.status(400).json({ error: "you need to be logged in to perform this action!" });
            }
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }
}