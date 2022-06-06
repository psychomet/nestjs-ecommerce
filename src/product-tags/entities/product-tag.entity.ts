import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ProductTagTranslate } from './product-tag-translate.entity';

@Entity()
export class ProductTag extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductTagTranslate, (translate) => translate.tag)
  translations?: ProductTagTranslate[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
