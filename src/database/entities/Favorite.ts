import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Barber } from "./Barber";
import { User } from "./User";

@Entity("favorites")
export class Favorite {
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
}