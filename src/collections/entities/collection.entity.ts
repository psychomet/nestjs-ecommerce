import { EntityHelper } from '../../utils/entity-helper';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { CollectionTranslation } from './collection-translation.entity';
import { ProductVariant } from '../../product-variants/entities/product-variant.entity';
import { ApiProperty } from '@nestjs/swagger';

type ConfigArg = {
  name: string;
  value: string;
};

type ConfigurableOperation = {
  code: string;
  args: Array<ConfigArg>;
};

@Entity()
export class Collection extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isRoot: boolean;

  @Column()
  position: number;

  @Column({ default: false })
  isPrivate: boolean;

  @OneToMany(
    () => CollectionTranslation,
    (translation) => translation.collection,
    {
      eager: true,
    },
  )
  translations: CollectionTranslation[];

  @Column('simple-json') filters: ConfigurableOperation[];

  @TreeChildren()
  children: Collection[];

  @TreeParent()
  parent: Collection;

  @ManyToMany(
    (type) => ProductVariant,
    (productVariant) => productVariant.collections,
  )
  @JoinTable()
  productVariants: ProductVariant[];
}
