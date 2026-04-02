import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('conversations')
@Index(['participant1_id', 'participant2_id'], { unique: true })
@Index(['updated_at'])
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  participant1_id: number;

  @Column()
  participant2_id: number;

  @Column({ nullable: true })
  listing_id: number;

  @Column({ type: 'text', nullable: true })
  last_message: string;

  @Column({ nullable: true })
  last_message_at: Date;

  @Column({ nullable: true })
  last_sender_id: number;

  @Column({ default: 0 })
  unread_count_p1: number; // Unread count for participant 1

  @Column({ default: 0 })
  unread_count_p2: number; // Unread count for participant 2

  @Column({ default: false })
  is_blocked: boolean;

  @Column({ nullable: true })
  blocked_by: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
