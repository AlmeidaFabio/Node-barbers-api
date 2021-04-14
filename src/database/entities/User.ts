import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Favorite } from "./Favorite";

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

    @Column()
    password:string;

    @Column()
    address:string;

    @Column()
    whatsapp:string;

    @OneToMany(() => Favorite, favorites => favorites.user, {
        cascade:true
    })
    favorites:Favorite[];
}