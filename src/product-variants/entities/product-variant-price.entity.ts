import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { ProductVariant } from './product-variant.entity';
import { TaxCategory } from '../../tax-categories/entities/tax-category.entity';
import { Language } from '../../languages/entities/language.entity';
import { CurrencyTranslation } from '../../currencies/entities/currency-translation.entity';
import { Currency } from '../../currencies/entities/currency.entity';

@Entity()
export class ProductVariantPrice extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column() price: number;

  @ManyToOne(() => TaxCategory, {
    eager: true,
  })
  @JoinColumn({ name: 'tax_category_id' })
  taxCategory: TaxCategory;

  @ManyToOne(
    (type) => ProductVariant,
    (variant) => variant.productVariantPrices,
  )
  @JoinColumn({ name: 'product_variant_id' })
  variant: ProductVariant;

  // @OneToMany(() => Currency, (currency) => currency.productVariantPrice, {
  //   eager: true,
  // })
  // currencies?: Currency[];

  @ManyToOne(() => Currency, {
    eager: true,
  })
  @JoinColumn({ name: 'currency_id' })
  currency: Currency;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
