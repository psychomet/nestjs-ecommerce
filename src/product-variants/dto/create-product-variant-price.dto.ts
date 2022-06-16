import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductVariantTranslationDto } from './create-product-variant-translation.dto';
import { ProductVariantTranslation } from '../entities/product-variant-translation.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { ProductVariantPrice } from '../entities/product-variant-price.entity';

export class CreateProductVariantPriceDto {
  @ApiProperty({ example: 0, type: Number })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 1 })
  @Validate(IsExist, ['Currency', 'id'], {
    message: 'currencyNotExists',
  })
  @IsNumber()
  @IsNotEmpty()
  currency: number;

  @ApiProperty({ example: 1 })
  @Validate(IsExist, ['TaxCategory', 'id'], {
    message: 'taxCategoryNotExists',
  })
  @IsNumber()
  @IsNotEmpty()
  taxCategory: number;
}
