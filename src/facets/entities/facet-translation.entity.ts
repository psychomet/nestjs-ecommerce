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
import { Facet } from './facet.entity';

@Entity()
export class FacetTranslation extends EntityHelper {
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
  @JoinColumn({ name: 'lang_id' })
  lang?: Language;

  @ManyToOne(() => Facet, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'facet_id' })
  facet?: Facet;
}
