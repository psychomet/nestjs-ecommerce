import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductBrandTranslateDto } from './create-product-brand-translate.dto';
import { ProductBrandTranslate } from '../entities/product-brand-translate.entity';

export class CreateProductBrandDto {
  @ApiProperty({ type: CreateProductBrandTranslateDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductBrandTranslate)
  translations: ProductBrandTranslate[];
}
