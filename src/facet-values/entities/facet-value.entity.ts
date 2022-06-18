import {
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
import { FacetValueTranslation } from './facet-value-translation.entity';
import { Facet } from '../../facets/entities/facet.entity';

@Entity()
export class FacetValue extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => FacetValueTranslation, (translate) => translate.facetValue, {
    eager: true,
  })
  translations?: FacetValueTranslation[];

  @ManyToOne(() => Facet, (group) => group.values, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'facet_id' })
  facet: Facet;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
