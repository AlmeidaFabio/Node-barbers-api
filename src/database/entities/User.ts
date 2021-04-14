import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ default:false })
    isBarber:boolean;

    @Column({ nullable:true })
    latitude:string;

    @Column({ nullable:true })
    longitude:string;
}