import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFacetValueTranslationDto } from './create-facet-value-translation.dto';
import { FacetValueTranslation } from '../entities/facet-value-translation.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class CreateFacetValueDto {
  @ApiProperty({ example: 1 })
  @Validate(IsExist, ['Facet', 'id'], {
    message: 'facetNotExists',
  })
  facetId: number;

  @ApiProperty({ type: CreateFacetValueTranslationDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => FacetValueTranslation)
  translations: FacetValueTranslation[];
}
