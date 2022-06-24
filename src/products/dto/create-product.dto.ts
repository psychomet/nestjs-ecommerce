import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductTranslationDto } from './create-product-translation.dto';
import { ProductTranslation } from '../entities/product-translation.entity';

export class CreateProductDto {
  @IsOptional()
  id: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  enabled: boolean;

  @ApiProperty({ type: CreateProductTranslationDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateProductTranslationDto)
  translations: ProductTranslation[];

  @IsArray()
  @ApiProperty({ example: [1], type: [Number], required: false })
  @IsOptional()
  facetValueIds: number[];
}
