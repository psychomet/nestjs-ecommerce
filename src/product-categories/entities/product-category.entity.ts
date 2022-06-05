import { EntityHelper } from '../../utils/entity-helper';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductCategoryTranslate } from './product-category-translate.entity';

@Entity()
export class ProductCategory extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToMany(() => ProductCategoryTranslate, (translate) => translate.id, {
  //   eager: true,
  //   cascade: true,
  // })
  // title: ProductCategoryTranslate[];

  @OneToMany(() => ProductCategoryTranslate, (translate) => translate.category)
  translations?: ProductCategoryTranslate[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
