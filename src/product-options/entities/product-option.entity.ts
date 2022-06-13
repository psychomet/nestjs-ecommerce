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
import { ProductOptionTranslation } from './product-option-translation.entity';
import { ProductOptionGroup } from '../../product-option-groups/entities/product-option-group.entity';

@Entity()
export class ProductOption extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    (type) => ProductOptionTranslation,
    (translation) => translation.productOption,
    { eager: true },
  )
  translations: ProductOptionTranslation[];

  @ManyToOne((type) => ProductOptionGroup, (group) => group.options)
  @JoinColumn({ name: 'group_id' })
  group: ProductOptionGroup;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
