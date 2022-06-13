import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { slugify } from '../../utils/slugify';
import { ProductOption } from './product-option.entity';
import { Language } from '../../languages/entities/language.entity';

@Entity()
export class ProductOptionTranslation extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column() name: string;

  @Column({ unique: true, nullable: true })
  code: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  @AfterLoad()
  setSlug() {
    this.code = slugify(this.name);
  }

  @ManyToOne((type) => ProductOption, (base) => base.translations)
  @JoinColumn({ name: 'product_option_id' })
  productOption: ProductOption;

  @ManyToOne(() => Language, {
    eager: true,
  })
  lang?: Language;
}
