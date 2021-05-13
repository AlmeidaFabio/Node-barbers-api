import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("covers")
export class UserCover {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    user_id:number;

    @OneToOne(() => User, user => user.cover)
    @JoinColumn({name:"user_id"})
    user:User;

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