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
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { slugify } from '../../utils/slugify';
import { Product } from './product.entity';
import { Language } from '../../languages/entities/language.entity';

@Entity()
export class ProductTranslation extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column() name: string;

  @Column({ unique: true, nullable: true })
  slug: string | null;

  @Column('text') description: string;

  @BeforeInsert()
  @BeforeUpdate()
  @AfterLoad()
  setSlug() {
    this.slug = slugify(this.name);
  }

  @ManyToOne((type) => Product, (base) => base.translations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Language, {
    eager: true,
  })
  @JoinColumn({ name: 'lang_id' })
  lang?: Language;
}
