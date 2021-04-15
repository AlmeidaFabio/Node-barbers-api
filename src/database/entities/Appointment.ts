import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Barber } from "./Barber";
import { Service } from "./Service";
import { User } from "./User";

@Entity("appointments")
export class Appointment {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    user_id:number;

    @ManyToOne(() => User)
    @JoinColumn({name:"user_id"})
    user:User;

    @Column()
    barber_id:number;

    @ManyToOne(() => Barber)
    @JoinColumn({name:"barber_id"})
    barber:Barber;

    @Column()
    service_id:number;

    @ManyToOne(() => Service)
    @JoinColumn({name:"service_id"})
    service:Service;

    @CreateDateColumn()
    ap_datetime:Date;
}