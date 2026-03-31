import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { PGListing } from './pg-listing.entity';

export enum AvailabilityStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  MAINTENANCE = 'maintenance',
  RESERVED = 'reserved',
}

@Entity('availability')
@Index(['listing_id'])
@Index(['room_number'])
@Index(['status'])
@Index(['effective_date'])
export class Availability {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: false })
  listing_id: number;

  @ManyToOne(() => PGListing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'listing_id' })
  listing: PGListing;

  @Column({ type: 'varchar', length: 50, nullable: true })
  room_number: string; // e.g., "Room 101", "Room A-1"

  @Column({ type: 'int', nullable: false })
  total_beds_in_room: number;

  @Column({ type: 'int', nullable: false })
  available_beds_in_room: number;

  @Column({
    type: 'enum',
    enum: AvailabilityStatus,
    default: AvailabilityStatus.AVAILABLE,
  })
  status: AvailabilityStatus;

  @Column({ type: 'date', nullable: true })
  effective_date: Date; // Date from which this availability is valid

  @Column({ type: 'text', nullable: true })
  notes: string; // Admin notes about availability

  // Timestamps
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Virtual properties
  get occupancy_percentage(): number {
    if (this.total_beds_in_room === 0) return 0;
    return ((this.total_beds_in_room - this.available_beds_in_room) / this.total_beds_in_room) * 100;
  }

  get is_fully_occupied(): boolean {
    return this.available_beds_in_room === 0;
  }

  get is_available(): boolean {
    return this.status === AvailabilityStatus.AVAILABLE && this.available_beds_in_room > 0;
  }
}
