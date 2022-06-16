import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductOptionGroupTranslationDto } from './create-product-option-group-translation.dto';
import { ProductOptionGroupTranslation } from '../entities/product-option-group-translation.entity';
import { CreateProductOptionDto } from '../../product-options/dto/create-product-option.dto';
import { ProductOption } from '../../product-options/entities/product-option.entity';

export class CreateProductOptionGroupDto {
  @ApiProperty({ type: CreateProductOptionGroupTranslationDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateProductOptionGroupTranslationDto)
  translations: ProductOptionGroupTranslation[];

  @ApiProperty({
    type: CreateProductOptionDto,
    isArray: true,
    default: [],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @Type(() => CreateProductOptionDto)
  options: ProductOption[];
}
