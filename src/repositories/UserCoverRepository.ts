import { EntityRepository, Repository } from "typeorm";
import { UserCover } from "../database/entities/UserCover";

@EntityRepository(UserCover)
export class UserCoverRepository extends Repository<UserCover> {}