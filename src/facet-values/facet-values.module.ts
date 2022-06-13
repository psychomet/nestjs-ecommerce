import { Module } from '@nestjs/common';
import { FacetValuesService } from './facet-values.service';
import { FacetValuesController } from './facet-values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacetValue } from './entities/facet-value.entity';
import { FacetValueTranslation } from './entities/facet-value-translation.entity';
import { Facet } from '../facets/entities/facet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FacetValue, FacetValueTranslation, Facet]),
  ],
  controllers: [FacetValuesController],
  providers: [FacetValuesService],
  exports: [FacetValuesService],
})
export class FacetValuesModule {}
