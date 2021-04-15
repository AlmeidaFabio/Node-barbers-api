import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Barber } from "./Barber";
import { User } from "./User";

@Entity("reviews")
export class Review {
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
    title:string;

    @Column()
    body:string;

    @Column({ type:"double" })
    rate:number;
}