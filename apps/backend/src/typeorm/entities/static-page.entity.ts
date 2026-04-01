import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

export enum PageType {
  STATIC = 'static',
  FAQ = 'faq',
  BLOG = 'blog',
  POLICY = 'policy',
}

export enum PageStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity('static_pages')
export class StaticPage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Index({ unique: true })
  @Column({ length: 200 })
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  excerpt: string;

  @Column({
    type: 'enum',
    enum: PageType,
    default: PageType.STATIC,
  })
  page_type: PageType;

  @Column({
    type: 'enum',
    enum: PageStatus,
    default: PageStatus.DRAFT,
  })
  status: PageStatus;

  @Column({ length: 200, nullable: true })
  meta_title: string;

  @Column({ length: 500, nullable: true })
  meta_description: string;

  @Column({ type: 'simple-array', nullable: true })
  meta_keywords: string[];

  @Column({ nullable: true })
  featured_image: string;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ nullable: true })
  author_id: number;

  @Column({ default: 0 })
  view_count: number;

  @Column({ default: 0 })
  sort_order: number;

  @Column({ nullable: true })
  published_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
