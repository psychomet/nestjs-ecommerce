import {
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
import { ProductOptionGroupTranslation } from './product-option-group-translation.entity';
import { ProductOption } from '../../product-options/entities/product-option.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class ProductOptionGroup extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    (type) => ProductOptionGroupTranslation,
    (translation) => translation.productOptionGroup,
    { eager: true },
  )
  translations: ProductOptionGroupTranslation[];

  @OneToMany((type) => ProductOption, (option) => option.group)
  options: ProductOption[];

  @ManyToOne((type) => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
