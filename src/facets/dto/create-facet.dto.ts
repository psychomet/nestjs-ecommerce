import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateFacetTranslationDto } from './create-facet-translation.dto';
import { Type } from 'class-transformer';
import { FacetTranslation } from '../entities/facet-translation.entity';

export class CreateFacetDto {
  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  isPrivate: boolean;

  @ApiProperty({ type: CreateFacetTranslationDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateFacetTranslationDto)
  translations: FacetTranslation[];
}
