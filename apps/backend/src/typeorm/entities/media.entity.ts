import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { PGListing } from './pg-listing.entity';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

@Entity('media')
@Index(['listing_id'])
@Index(['media_type'])
@Index(['display_order'])
@Index(['created_at'])
export class Media {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: false })
  listing_id: number;

  @ManyToOne(() => PGListing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'listing_id' })
  listing: PGListing;

  @Column({
    type: 'enum',
    enum: MediaType,
    nullable: false,
  })
  media_type: MediaType;

  @Column({ type: 'varchar', length: 500, nullable: false })
  url: string; // S3 or CDN URL

  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnail_url: string; // Thumbnail for images/videos

  @Column({ type: 'varchar', length: 255, nullable: true })
  original_filename: string;

  @Column({ type: 'int', nullable: true })
  file_size: number; // in bytes

  @Column({ type: 'varchar', length: 50, nullable: true })
  mime_type: string; // e.g., "image/jpeg", "video/mp4"

  @Column({ type: 'int', nullable: true })
  width: number; // For images and videos

  @Column({ type: 'int', nullable: true })
  height: number; // For images and videos

  @Column({ type: 'int', nullable: true })
  duration: number; // For videos (in seconds)

  @Column({ type: 'int', default: 0 })
  display_order: number; // Order in gallery (0 = primary/cover image)

  @Column({ type: 'boolean', default: false })
  is_cover: boolean; // Main display image for listing

  @Column({ type: 'text', nullable: true })
  alt_text: string; // For accessibility

  @Column({ type: 'text', nullable: true })
  caption: string; // Optional description

  // Processing status (for async uploads)
  @Column({ type: 'boolean', default: true })
  is_processed: boolean;

  @Column({ type: 'text', nullable: true })
  processing_error: string;

  // Timestamps
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Virtual properties
  get file_size_mb(): number {
    return this.file_size ? this.file_size / (1024 * 1024) : 0;
  }

  get is_image(): boolean {
    return this.media_type === MediaType.IMAGE;
  }

  get is_video(): boolean {
    return this.media_type === MediaType.VIDEO;
  }

  // Format duration for display (MM:SS)
  get formatted_duration(): string | null {
    if (!this.duration) return null;
    const minutes = Math.floor(this.duration / 60);
    const seconds = this.duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
