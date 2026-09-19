import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { currentDatePart, currentTimePart } from '../common/date-time.util.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  no!: number;

  @Column({ unique: true })
  id!: string; // 회원 아이디 (로그인용)

  @Column({ nullable: true })
  nickname?: string;

  @Column()
  password!: string;

  @Column({ name: 'c_date', type: 'date' })
  cDate!: string;

  @Column({ name: 'c_time', type: 'time' })
  cTime!: string;

  @Column({ name: 'd_date', type: 'date', nullable: true })
  dDate?: string | null;

  @Column({ name: 'd_time', type: 'time', nullable: true })
  dTime?: string | null;

  @BeforeInsert()
  setCreatedAt() {
    this.cDate = currentDatePart();
    this.cTime = currentTimePart();
  }
}
