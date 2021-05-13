import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserService } from "../services/UserService";

export class UserController {
    async create(request:Request, response:Response) {
        const usersService = new UserService();

        const { originalname:filename, filename:key } = request.file;

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
            filename,
            key,
            url: `${process.env.BaseUrl}/images/covers/${key}`,
            user_id: null
        }

        try { 
           const userExists = await usersService.getUserByEmail(email);

            if(userExists) {
               return response.status(403).json({error: "User already exists!"});
            } else {
                const user = await usersService.createUser(data, cover);

                const token = jwt.sign({ id:user.id }, process.env.SECRET, { expiresIn:864000 });

                user.password = undefined;

                return response.status(200).json({ user, token }); 
            }
        } catch (err) {
            return response.status(400).json({ error:err });
        }
    }

    async readAll(request:Request, response:Response) {
        const userService = new UserService();

        const { page = 1, limit = 16 } = request.query;

        try {
           const res = await userService.getUsers(page.toString(), limit.toString());
           
           res.users.map(user => {
               user.password = undefined;
           })
           return response.status(201).json({
               users:res.users,
               totalPages: Math.ceil(res.count / parseInt(limit.toString())),
               page
           });

        } catch (err) {
            return response.status(400).json({ error:err });
        }
    }

    async readOne(request:Request, response:Response) {
        const userService = new UserService();

        const id = parseInt(request.params.id);

        try {
            if(id) {
                const user = await userService.getUserById(id);

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
        const userService = new UserService();

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
                        await userService.updateUser(id, data)

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
        const userService = new UserService();

        const id = request.params.id;

        const token = request.headers.authorization;

        try {
            if(token) {
                const loggedUser = jwt.decode(token);

                if(id) {
                    if(id === loggedUser['id'].toString()) {
                        await userService.deleteUser(id);

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