import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from '../../utils/entity-helper';
import { TaxCategory } from '../../tax-categories/entities/tax-category.entity';
import { DecimalTransformer } from '../../value-transformers';

@Entity()
export class TaxRate extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column() enabled: boolean;

  @Column() name: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  value: number;

  @ManyToOne((type) => TaxCategory)
  @JoinColumn({ name: 'tax_category_id' })
  category: TaxCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
