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
import { Language } from '../../languages/entities/language.entity';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { slugify } from '../../utils/slugify';
import { ProductTag } from './product-tag.entity';

@Entity()
export class ProductTagTranslate extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  slug: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  @AfterLoad()
  setSlug() {
    this.slug = slugify(this.name);
  }

  @ManyToOne(() => Language, {
    eager: true,
  })
  lang?: Language;

  @ManyToOne(() => ProductTag, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tag_id' })
  tag?: ProductTag;
}
