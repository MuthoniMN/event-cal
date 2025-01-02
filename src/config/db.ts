import { DataSource } from "typeorm";
import { config } from "dotenv";
import Ticket from "../models/ticket.model";
import Event from "../models/event.model";
import User from "../models/user.model";

config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT && +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  entities: [User, Event, Ticket],
  migrations: ["./src/**/migrations/*.ts"],
  migrationsTableName: "db_migrations"
})

export default AppDataSource;
