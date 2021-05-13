import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { Favorite } from "./Favorite";
import { UserCover } from "./UserCover";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    name:string;

    @Column()
    lastname:string;

    @Column({ unique:true })
    email:string;

    @Column({select:false})
    password:string;

    @Column()
    address:string;

    @Column()
    whatsapp:string;

    @OneToMany(() => Favorite, favorites => favorites.user, {
        cascade:true
    })
    favorites:Favorite[];

    @OneToMany(() => Appointment, appointments => appointments.user, {
        cascade:true
    })
    appointments:Appointment[];

    @OneToOne(() => UserCover, cover => cover.user, {
        cascade:true
    })
    cover:UserCover;
}