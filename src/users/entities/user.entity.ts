import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({
    nullable: true,
  })
  bio: string;

  @Column({
    nullable: true,
  })
  image: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const roundOfSalt = 10;
    try {
      this.password = await bcrypt.hash(this.password, roundOfSalt);
    } catch {
      return null;
    }
  }
}
