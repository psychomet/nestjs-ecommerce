import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';
import { ProductOption } from '../../product-options/entities/product-option.entity';
import { FacetValue } from '../../facet-values/entities/facet-value.entity';
import { ProductVariantPrice } from './product-variant-price.entity';
import { ProductVariantTranslation } from './product-variant-translation.entity';
import { Collection } from '../../collections/entities/collection.entity';

@Entity()
export class ProductVariant extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  enabled: boolean;

  @Column()
  sku: string;

  @Column({ default: 0 })
  stockOnHand: number;

  @Column({ default: 0 })
  stockAllocated: number;

  @Column({ default: 0 })
  outOfStockThreshold: number;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToMany(() => ProductOption)
  @JoinTable()
  options: ProductOption[];

  @ManyToMany(() => FacetValue)
  @JoinTable()
  facetValues: FacetValue[];

  @OneToMany(() => ProductVariantPrice, (price) => price.variant, {
    eager: true,
  })
  productVariantPrices: ProductVariantPrice[];

  @OneToMany(
    () => ProductVariantTranslation,
    (translation) => translation.productVariant,
    {
      eager: true,
    },
  )
  translations: ProductVariantTranslation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany((type) => Collection, (collection) => collection.productVariants)
  collections: Collection[];
}
