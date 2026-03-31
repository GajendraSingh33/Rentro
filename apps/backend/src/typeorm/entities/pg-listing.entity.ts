import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';

export enum ListingStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING_APPROVAL = 'pending_approval',
  REJECTED = 'rejected',
}

export enum RoomType {
  SINGLE = 'single',
  DOUBLE = 'double',
  TRIPLE = 'triple',
  DORMITORY = 'dormitory',
}

export enum GenderPreference {
  MALE = 'male',
  FEMALE = 'female',
  ANY = 'any',
}

export enum FoodType {
  VEG = 'veg',
  NON_VEG = 'non_veg',
  BOTH = 'both',
  NONE = 'none',
}

@Entity('pg_listings')
@Index(['owner_id'])
@Index(['status'])
@Index(['city'])
@Index(['monthly_rent'])
@Index(['created_at'])
@Index(['room_type'])
@Index(['gender_preference'])
export class PGListing {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: false })
  owner_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  // Basic Information
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({
    type: 'enum',
    enum: ListingStatus,
    default: ListingStatus.DRAFT,
  })
  status: ListingStatus;

  // Location Details
  @Column({ type: 'varchar', length: 500, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  pincode: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ type: 'text', nullable: true })
  nearby_landmarks: string; // JSON string array

  // Room & Pricing Details
  @Column({
    type: 'enum',
    enum: RoomType,
    nullable: false,
  })
  room_type: RoomType;

  @Column({ type: 'int', nullable: false })
  sharing_capacity: number; // Number of people per room

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  monthly_rent: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  security_deposit: number;

  @Column({ type: 'boolean', default: false })
  electricity_included: boolean;

  @Column({ type: 'boolean', default: false })
  water_included: boolean;

  @Column({ type: 'boolean', default: false })
  wifi_included: boolean;

  // Availability
  @Column({ type: 'int', nullable: false })
  total_rooms: number;

  @Column({ type: 'int', nullable: false })
  available_rooms: number;

  @Column({ type: 'int', nullable: false })
  total_beds: number;

  @Column({ type: 'int', nullable: false })
  available_beds: number;

  @Column({ type: 'date', nullable: true })
  available_from: Date;

  // Preferences
  @Column({
    type: 'enum',
    enum: GenderPreference,
    default: GenderPreference.ANY,
  })
  gender_preference: GenderPreference;

  @Column({ type: 'int', nullable: true })
  min_age: number;

  @Column({ type: 'int', nullable: true })
  max_age: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  preferred_occupation: string; // student, working professional, any

  // Amenities (stored as JSON array of strings)
  @Column({ type: 'text', nullable: true })
  amenities: string; // JSON: ["wifi", "parking", "laundry", "gym", etc.]

  // Food Details
  @Column({
    type: 'enum',
    enum: FoodType,
    nullable: false,
    default: FoodType.NONE,
  })
  food_type: FoodType;

  @Column({ type: 'boolean', default: false })
  breakfast_included: boolean;

  @Column({ type: 'boolean', default: false })
  lunch_included: boolean;

  @Column({ type: 'boolean', default: false })
  dinner_included: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  food_cost_per_month: number;

  // Rules & Regulations
  @Column({ type: 'text', nullable: true })
  house_rules: string;

  @Column({ type: 'time', nullable: true })
  gate_closing_time: string;

  @Column({ type: 'boolean', default: false })
  visitors_allowed: boolean;

  @Column({ type: 'boolean', default: false })
  smoking_allowed: boolean;

  @Column({ type: 'boolean', default: false })
  drinking_allowed: boolean;

  @Column({ type: 'boolean', default: false })
  pets_allowed: boolean;

  // Contact Information (masked until inquiry)
  @Column({ type: 'varchar', length: 20, nullable: true })
  contact_phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contact_email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  preferred_contact_method: string; // phone, email, whatsapp

  @Column({ type: 'boolean', default: false })
  contact_verified: boolean;

  // Analytics & Metrics
  @Column({ type: 'int', default: 0 })
  view_count: number;

  @Column({ type: 'int', default: 0 })
  inquiry_count: number;

  @Column({ type: 'int', default: 0 })
  booking_count: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  average_rating: number;

  @Column({ type: 'int', default: 0 })
  review_count: number;

  // Moderation
  @Column({ type: 'int', nullable: true })
  approved_by: number; // Admin/Moderator user ID

  @Column({ type: 'timestamp', nullable: true })
  approved_at: Date;

  @Column({ type: 'text', nullable: true })
  rejection_reason: string;

  @Column({ type: 'boolean', default: false })
  is_featured: boolean;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  // Timestamps
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Virtual properties
  get is_available(): boolean {
    return this.available_beds > 0 || this.available_rooms > 0;
  }

  get occupancy_rate(): number {
    if (this.total_beds === 0) return 0;
    return ((this.total_beds - this.available_beds) / this.total_beds) * 100;
  }

  // Safely parse JSON fields
  get amenitiesList(): string[] {
    try {
      return this.amenities ? JSON.parse(this.amenities) : [];
    } catch {
      return [];
    }
  }

  set amenitiesList(value: string[]) {
    this.amenities = JSON.stringify(value);
  }

  get landmarksList(): string[] {
    try {
      return this.nearby_landmarks ? JSON.parse(this.nearby_landmarks) : [];
    } catch {
      return [];
    }
  }

  set landmarksList(value: string[]) {
    this.nearby_landmarks = JSON.stringify(value);
  }

  // Remove sensitive data from serialization
  toJSON() {
    const { contact_phone, contact_email, ...rest } = this;
    return {
      ...rest,
      // Only return masked contact info
      contact_phone: contact_phone ? `${contact_phone.slice(0, 2)}****${contact_phone.slice(-2)}` : null,
      contact_email: contact_email ? `${contact_email.split('@')[0].slice(0, 2)}****@${contact_email.split('@')[1]}` : null,
    };
  }
}
