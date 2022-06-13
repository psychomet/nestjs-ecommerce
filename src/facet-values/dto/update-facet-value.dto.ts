import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFacetValueDto } from './create-facet-value.dto';
import { ArrayMinSize, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateFacetValueTranslationDto } from './update-facet-value-translation.dto';
import { FacetValueTranslation } from '../entities/facet-value-translation.entity';

export class UpdateFacetValueDto extends PartialType(CreateFacetValueDto) {
  @ApiProperty({ type: UpdateFacetValueTranslationDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => FacetValueTranslation)
  translations: FacetValueTranslation[];
}
