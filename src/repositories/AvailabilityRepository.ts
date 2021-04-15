import { EntityRepository, Repository } from "typeorm";
import { Availability } from "../database/entities/Availability";

@EntityRepository(Availability)
export class AvailabilityRepository extends Repository<Availability>{}