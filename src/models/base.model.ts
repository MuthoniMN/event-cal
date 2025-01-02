import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn  } from "typeorm";

export abstract class BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  created_at: Date 

  @UpdateDateColumn()
  updated_at: Date 

  @DeleteDateColumn()
  deleted_at: Date
}
