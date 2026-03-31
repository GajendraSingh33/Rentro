import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
  Index,
} from 'typeorm';

export enum UserRole {
  SEEKER = 'seeker',
  OWNER = 'owner',
  ADMIN = 'admin',
}

@Entity('users')
@Unique(['email'])
@Index(['email'])
@Index(['role'])
@Index(['created_at'])
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar_url: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.SEEKER,
  })
  role: UserRole;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'boolean', default: false })
  email_verified: boolean;

  @Column({ type: 'varchar', nullable: true })
  phone_verified: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_login_at: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Virtual property - not stored in DB
  get full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  // Remove password hash from serialization
  toJSON() {
    const { password_hash, ...rest } = this;
    return rest;
  }
}
