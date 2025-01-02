import { Entity, Column, BeforeInsert,
OneToMany } from "typeorm";
import { BaseModel } from "./base.model";
import * as bcrypt from "bcrypt";
import Ticket from "./ticket.model";
import Event from "./event.model";

export enum UserRole {
  ORGANIZER = "organizer",
  INDIVIDUAL = "individual"
}

@Entity()
export default class User extends BaseModel {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  username: string

  @Column()
  email: string

  @Column({ unique: true })
  phoneNumber: string

  @Column({  
    type: "enum",
    enum: UserRole,
    default: UserRole.INDIVIDUAL
  })
  role: UserRole

  @Column()
  password: string

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[]

  @OneToMany(() => Event, (event) => event.organizer)
  organized_events: Event[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
