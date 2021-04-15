import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Barber } from "./Barber";

@Entity("availability")
export class Availability {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    barber_id:number;

    @ManyToOne(() => Barber)
    @JoinColumn({name:"barber_id"})
    barber:Barber;

    @Column()
    weekday:number;

    @Column({ type:"text" })
    hours:string;
}