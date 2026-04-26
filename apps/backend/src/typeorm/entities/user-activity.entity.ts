import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { PGListing as PgListing } from './pg-listing.entity';

export enum ActivityType {
  VIEW = 'view',
  SEARCH = 'search',
  FAVORITE = 'favorite',
  INQUIRY = 'inquiry',
  BOOKING = 'booking',
  SHARE = 'share',
}

@Entity('user_activities')
@Index(['user_id', 'created_at'])
@Index(['listing_id', 'activity_type'])
@Index(['activity_type', 'created_at'])
export class UserActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  user_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  @Index()
  listing_id: number;

  @ManyToOne(() => PgListing, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'listing_id' })
  listing: PgListing;

  @Column({
    type: 'enum',
    enum: ActivityType,
  })
  @Index()
  activity_type: ActivityType;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>; // Additional context (search query, filters, etc.)

  @Column({ type: 'varchar', length: 255, nullable: true })
  ip_address: string;

  @Column({ type: 'text', nullable: true })
  user_agent: string;

  @CreateDateColumn()
  @Index()
  created_at: Date;
}
