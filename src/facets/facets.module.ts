import { Module } from '@nestjs/common';
import { FacetsService } from './facets.service';
import { FacetsController } from './facets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facet } from './entities/facet.entity';
import { FacetTranslation } from './entities/facet-translation.entity';
import { FacetValue } from '../facet-values/entities/facet-value.entity';
import { FacetValueTranslation } from '../facet-values/entities/facet-value-translation.entity';
import { Language } from '../languages/entities/language.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Facet,
      FacetTranslation,
      FacetValue,
      FacetValueTranslation,
      Language,
    ]),
  ],
  controllers: [FacetsController],
  providers: [FacetsService],
  exports: [FacetsService],
})
export class FacetsModule {}
