import { EntityHelper } from '../../utils/entity-helper';
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
import { Collection } from './collection.entity';

@Entity()
export class CollectionTranslation extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column() name: string;

  @Column({ unique: true, nullable: true })
  slug: string | null;

  @Column('text') description: string;

  @BeforeInsert()
  @BeforeUpdate()
  @AfterLoad()
  setSlug() {
    this.slug = slugify(this.name);
  }

  @ManyToOne((type) => Collection, (base) => base.translations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;

  @ManyToOne(() => Language, {
    eager: true,
  })
  @JoinColumn({ name: 'lang_id' })
  lang?: Language;
}
