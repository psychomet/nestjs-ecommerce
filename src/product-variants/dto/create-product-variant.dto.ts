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
import { CreateProductVariantPriceDto } from './create-product-variant-price.dto';

export class CreateProductVariantDto {
  @ApiProperty({ example: false, type: Boolean })
  @IsBoolean()
  @IsOptional()
  enabled: boolean;

  @ApiProperty({ example: [1], type: [Number] })
  @IsArray()
  @IsOptional()
  optionIds: number[];

  @ApiProperty({ example: false, type: Number })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ example: false, type: String })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: 0, type: Number })
  @IsNumber()
  @IsNotEmpty()
  stockOnHand: number;

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

  @ApiProperty({ type: CreateProductVariantTranslationDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateProductVariantTranslationDto)
  translations: ProductVariantTranslation[];

  @ApiProperty({ type: CreateProductVariantPriceDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateProductVariantPriceDto)
  productVariantPrices: ProductVariantPrice[];
}
