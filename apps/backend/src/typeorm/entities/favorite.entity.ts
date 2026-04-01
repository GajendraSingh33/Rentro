import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { PGListing } from './pg-listing.entity';

@Entity('favorites')
@Unique(['user_id', 'listing_id']) // Each user can only favorite a listing once
@Index(['user_id'])
@Index(['listing_id'])
@Index(['created_at'])
export class Favorite {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'int', nullable: false })
  listing_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => PGListing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'listing_id' })
  listing: PGListing;

  @Column({ type: 'text', nullable: true })
  notes: string; // Personal notes about the listing

  @CreateDateColumn()
  created_at: Date;
}
