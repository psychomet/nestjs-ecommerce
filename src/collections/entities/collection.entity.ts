import { EntityHelper } from '../../utils/entity-helper';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { CollectionTranslation } from './collection-translation.entity';
import { ProductVariant } from '../../product-variants/entities/product-variant.entity';

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
