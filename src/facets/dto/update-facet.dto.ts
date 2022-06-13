import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { FacetTranslation } from '../entities/facet-translation.entity';
import { UpdateFacetTranslationDto } from './update-facet-translation.dto';
import { UpdateFacetValueDto } from '../../facet-values/dto/update-facet-value.dto';
import { FacetValue } from '../../facet-values/entities/facet-value.entity';

export class UpdateFacetDto {
  @ApiProperty({ type: UpdateFacetTranslationDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => FacetTranslation)
  translations: FacetTranslation[];

  @ApiProperty({ type: UpdateFacetValueDto, isArray: true })
  @IsArray()
  @Type(() => FacetValue)
  @IsOptional()
  values: FacetValue[];
}
