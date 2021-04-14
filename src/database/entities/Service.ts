import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Barber } from "./Barber";

@Entity("services")
export class Service {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    barber_id:number;

    @ManyToOne(() => Barber)
    @JoinColumn({name:"barber_id"})
    barber:Barber;

    @Column()
    name:string;

    @Column({type:'double'})
    price:number;
}