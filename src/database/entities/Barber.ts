import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Availability } from "./Availability";
import { BarberCover } from "./BarberCover";
import { Photo } from "./Photo";
import { Review } from "./Review";
import { Service } from "./Service";

@Entity("barbers")
export class Barber {
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

    @Column({ nullable:true })
    latitude:string;

    @Column({ nullable:true })
    longitude:string;

    @OneToMany(() => Service, services => services.barber, {
        cascade:true
    })
    services:Service[];

    @OneToMany(() => Availability, availability => availability.barber, {
        cascade:true
    })
    availability:Availability[];

    @OneToMany(() => Review, reviews => reviews.barber, {
        cascade:true
    })
    reviews:Review[];

    @OneToMany(() => Photo, photos => photos.barber, {
        cascade:true
    })
    photos:Photo[];

    @OneToOne(() => BarberCover, cover => cover.barber, {
        cascade:true
    })
    cover:BarberCover;
}