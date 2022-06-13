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
import { ProductVariant } from './product-variant.entity';
import { TaxCategory } from '../../tax-categories/entities/tax-category.entity';

@Entity()
export class ProductVariantPrice extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column() price: number;

  @ManyToOne((type) => TaxCategory)
  @JoinColumn({ name: 'tax_category_id' })
  taxCategory: TaxCategory;

  @ManyToOne(
    (type) => ProductVariant,
    (variant) => variant.productVariantPrices,
  )
  @JoinColumn({ name: 'product_variant_id' })
  variant: ProductVariant;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
