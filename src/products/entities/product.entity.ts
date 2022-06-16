import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { FacetValue } from '../../facet-values/entities/facet-value.entity';
import { ProductTranslation } from './product-translation.entity';
import { ProductOptionGroup } from '../../product-option-groups/entities/product-option-group.entity';
import { ProductVariant } from '../../product-variants/entities/product-variant.entity';

@Entity()
export class Product extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  enabled: boolean;

  @ManyToMany((type) => FacetValue)
  @JoinTable()
  facetValues: FacetValue[];

  @OneToMany(
    (type) => ProductTranslation,
    (translation) => translation.product,
    {
      eager: true,
    },
  )
  translations: ProductTranslation[];

  @OneToMany((type) => ProductOptionGroup, (optionGroup) => optionGroup.product)
  optionGroups: ProductOptionGroup[];

  @OneToMany((type) => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
