import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity.js';
import { currentDatePart, currentTimePart } from '../common/date-time.util.js';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn()
  no!: number;

  @Column()
  name!: string; // 게시판 이름

  @Column('text')
  content!: string; // 게시글 내용

  @Column({ name: 'board_id' })
  boardId!: string; // 게시판 id

  @Column({ name: 'create_user_no' })
  createUserNo!: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'create_user_no' })
  createUser!: User;

  @Column({ name: 'c_date', type: 'date' })
  cDate!: string;

  @Column({ name: 'c_time', type: 'time' })
  cTime!: string;

  @Column({ name: 'e_date', type: 'date', nullable: true })
  eDate?: string | null;

  @Column({ name: 'e_time', type: 'time', nullable: true })
  eTime?: string | null;

  @BeforeInsert()
  setCreatedAt() {
    this.cDate = currentDatePart();
    this.cTime = currentTimePart();
  }
}
