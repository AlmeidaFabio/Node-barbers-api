import { EntityRepository, Repository } from "typeorm";
import { BarberCover } from "../database/entities/BarberCover";

@EntityRepository(BarberCover) 
export class BarberCoverRepository extends Repository<BarberCover> {}