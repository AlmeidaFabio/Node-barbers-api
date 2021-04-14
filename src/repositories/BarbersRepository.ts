import { EntityRepository, Repository } from "typeorm";
import { Barber } from "../database/entities/Barber";

@EntityRepository(Barber)
export class BarbersRepository extends Repository<Barber>{}