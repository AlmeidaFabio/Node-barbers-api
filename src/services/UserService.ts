import { getCustomRepository, Repository } from "typeorm";
import { User } from "../database/entities/User";
import { UserCover } from "../database/entities/UserCover";
import { UserCoverRepository } from "../repositories/UserCoverRepository";
import { UsersRepository } from "../repositories/UsersRepository";

type Data = {
    name:string;
    lastname:string;
    email:string;
    password:string;
    address:string;
    whatsapp:string;
}

type File = {
    filename:string;
    key:string;
    url:string;
    user_id:number;
}

export class UserService {
    private usersRepository: Repository<User>;
    private coversRepository: Repository<UserCover>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
        this.coversRepository = getCustomRepository(UserCoverRepository);
    }

    async getUserByEmail(email:string) {
        try {
            const user = await this.usersRepository.findOne({
                where:[{
                    email
                }],
                select:["id", "email", "password"]
            });

            return user;
        } catch (err) {
            return err;
        }
    }

    async createUser(data:Data, cover:File) {
        try {
           const user = this.usersRepository.create(data);

           await this.usersRepository.save(user);

           const user_id = user.id;
            
           cover.user_id = user_id;

           const img = this.coversRepository.create(cover);

           await this.coversRepository.save(img);

           return user;

        } catch (err) {
            return err
        }
    }

    async getUsers(page:string, limit:string) {
        try {
            const users = await this.usersRepository.find({
                relations:["cover", "favorites", "appointments"],
                order:{name: "ASC"},
                take:(parseInt(limit) * 1),
                skip:((parseInt(page) - 1) * parseInt(limit))
            })

            const count = users.length;

            return {users, count};

        } catch (err) {
            return err
        }
    }

    async getUserById(id:number) {
        try {
           const user = await this.usersRepository.findOne(id, {
               relations:["cover"]
           }) 

           return user;

        } catch (err) {
            return err
        }
    }

    async updateUser(id:string, data:Data) {
        try {
            await this.usersRepository.update(id, {
                name:data.name,
                lastname:data.lastname,
                password:data.password,
                address:data.address,
                whatsapp:data.whatsapp
            })

            return;

        } catch (err) {
            return err
        }
    }

    async deleteUser(id:string) {
        try {
            await this.usersRepository.delete(id);

            return;
        } catch (err) {
            return err
        }
    }
}