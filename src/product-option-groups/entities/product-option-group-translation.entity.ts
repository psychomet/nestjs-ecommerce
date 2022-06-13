import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { slugify } from '../../utils/slugify';
import { Language } from '../../languages/entities/language.entity';
import { EntityHelper } from '../../utils/entity-helper';
import { ProductOptionGroup } from './product-option-group.entity';

@Entity()
export class ProductOptionGroupTranslation extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column() name: string;

  @Column({ unique: true, nullable: true })
  code: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  @AfterLoad()
  setSlug() {
    this.code = slugify(this.name);
  }

  @ManyToOne(() => Language, {
    eager: true,
  })
  lang?: Language;

  @ManyToOne((type) => ProductOptionGroup, (base) => base.translations)
  @JoinColumn({ name: 'product_option_group_id' })
  productOptionGroup: ProductOptionGroup;
}
