import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name?: string;

  @Column({ type: 'int', nullable: true }) // Set the type to 'int' for age, and allow it to be null
  age?: number | null;

  @Column()
  email?: string;

  @CreateDateColumn()
  create_at!: Date;
}
