import { EntityHelper } from '../../utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FacetTranslation } from './facet-translation.entity';
import { FacetValue } from '../../facet-values/entities/facet-value.entity';

@Entity()
export class Facet extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isPrivate: boolean;

  @OneToMany(() => FacetTranslation, (translate) => translate.facet, {
    eager: true,
  })
  translations?: FacetTranslation[];

  @OneToMany(() => FacetValue, (value) => value.facet)
  values: FacetValue[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
