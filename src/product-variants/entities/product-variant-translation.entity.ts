import {
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
import { Language } from '../../languages/entities/language.entity';
import { Product } from '../../products/entities/product.entity';
import { ProductVariant } from './product-variant.entity';

@Entity()
export class ProductVariantTranslation extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Language, {
    eager: true,
  })
  lang?: Language;

  @ManyToOne(() => ProductVariant, (base) => base.translations)
  @JoinColumn({ name: 'product_variant_id' })
  productVariant: ProductVariant;
}
