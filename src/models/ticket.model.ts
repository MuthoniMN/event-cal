import { Entity, ManyToOne } from "typeorm";
import { BaseModel } from "./base.model";
import User from "./user.model";
import Event from "./event.model";

@Entity()
export default class Ticket extends BaseModel {
  @ManyToOne(() => User, (user) => user.tickets)
  user: User

  @ManyToOne(() => Event, (event) => event.tickets)
  event: Event
}
