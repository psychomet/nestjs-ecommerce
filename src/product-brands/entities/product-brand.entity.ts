import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductBrandTranslate } from './product-brand-translate.entity';

@Entity()
export class ProductBrand {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductBrandTranslate, (translate) => translate.brand)
  translations?: ProductBrandTranslate[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
