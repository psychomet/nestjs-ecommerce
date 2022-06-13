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
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { Language } from '../../languages/entities/language.entity';
import { FacetValue } from './facet-value.entity';
import { slugify } from '../../utils/slugify';

@Entity()
export class FacetValueTranslation extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  code: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  @AfterLoad()
  setSlug() {
    this.code = slugify(this.code);
  }

  @ManyToOne(() => Language, {
    eager: true,
  })
  lang?: Language;

  @ManyToOne(() => FacetValue, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'facet_value_id' })
  facetValue?: FacetValue;
}
