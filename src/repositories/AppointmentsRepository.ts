import { EntityRepository, Repository } from "typeorm";
import { Appointment } from "../database/entities/Appointment";

@EntityRepository(Appointment)
export class AppointmensRepository extends Repository<Appointment>{}