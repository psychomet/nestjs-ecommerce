import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
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
import { CurrencyTranslation } from './currency-translation.entity';
import { ProductVariantPrice } from '../../product-variants/entities/product-variant-price.entity';
import { slugify } from '../../utils/slugify';

@Entity()
export class Currency extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CurrencyTranslation, (translate) => translate.currency, {
    eager: true,
  })
  translations?: CurrencyTranslation[];

  // @ManyToOne(() => ProductVariantPrice, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // @JoinColumn({ name: 'product_variant_price_id' })
  // productVariantPrice: ProductVariantPrice;

  @Column({ unique: true, nullable: true })
  code: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  @AfterLoad()
  setSlug() {
    this.code = slugify(this.code);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
