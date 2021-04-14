import { EntityRepository, Repository } from "typeorm";
import { User } from "../database/entities/User";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{}