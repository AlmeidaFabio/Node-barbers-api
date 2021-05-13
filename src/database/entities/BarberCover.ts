import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Barber } from "./Barber";

@Entity("barbercovers")
export class BarberCover {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    barber_id:number;

    @OneToOne(() => Barber, barber => barber.cover)
    @JoinColumn({name:"barber_id"})
    barber:Barber;

    @Column()
    filename:string;

    @Column()
    key:string;

    @Column()
    url:string;

    @CreateDateColumn({ default:Date.now() })
    created_at:Date;

    constructor () {
        if(!this.url) {
            this.url = `${process.env.BaseUrl}/uploads/covers/${this.key}`
        }
    }
}