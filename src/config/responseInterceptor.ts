import User from "../models/user.model";
import Ticket from "../models/ticket.model";
import Event from "../models/event.model";

export type TData = {
  user?: User
  users?: User[]
  ticket?: Ticket
  tickets?: Ticket[]
  event?: Event
  events?: Event[]
  token?: string
}

export default function responseInterceptor(
  status: number,
  message: string,
  data: TData,
){
  const response = {
    status,
    message,
    data
  };
  return response;
}
