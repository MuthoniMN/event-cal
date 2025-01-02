import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { BaseModel } from "./base.model";
import User from "./user.model";
import Ticket from "./ticket.model";

@Entity()
export default class Event extends BaseModel {
 @Column()
 title: string

 @Column()
 description: string

 @Column()
 date: Date 

 @Column()
 venue: string

 @Column({ type: "int" })
 capacity: number

 @Column({ type: "int" })
 ticketPrice: number

 @ManyToOne(() => User, (user) => user.organized_events)
 organizer: User

 @OneToMany(() => Ticket, (ticket) => ticket.event)
 tickets: Ticket
}
