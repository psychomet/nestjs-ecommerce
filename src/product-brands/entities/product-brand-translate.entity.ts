import { ApiProperty } from '@nestjs/swagger';
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
import { slugify } from '../../utils/slugify';
import { Language } from '../../languages/entities/language.entity';
import { ProductBrand } from './product-brand.entity';

@Entity()
export class ProductBrandTranslate {
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

  @ManyToOne(() => ProductBrand, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'brand_id' })
  brand?: ProductBrand;
}
