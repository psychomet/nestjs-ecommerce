import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from '../../languages/entities/language.entity';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from './product-category.entity';
import { slugify } from '../../utils/slugify';

@Entity()
export class ProductCategoryTranslate extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true, nullable: true })
  slug: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  @AfterLoad()
  setSlug() {
    this.slug = slugify(this.title);
  }

  @Column()
  description: string;

  @ManyToOne(() => Language, {
    eager: true,
  })
  lang?: Language;

  @ManyToOne(() => ProductCategory, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category?: ProductCategory;
}
