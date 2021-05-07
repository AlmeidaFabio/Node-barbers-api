import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Barber } from "./Barber";

@Entity("barberphotos")
export class Photo {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    barber_id:number;

    @ManyToOne(() => Barber, barber => barber.photos)
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
            this.url = `${process.env.BaseUrl}/${this.key}`
        }
    }
}