import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @CreateDateColumn()
    weekday:Date;

    @Column({ type:"text" })
    hours:string;
}