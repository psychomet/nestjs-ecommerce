import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';
import { CreateProductCategoryTranslateDto } from './create-product-category-translate.dto';
import { ProductCategoryTranslate } from '../entities/product-category-translate.entity';
import { Type } from 'class-transformer';

export class CreateProductCategoryDto {
  @ApiProperty({ type: CreateProductCategoryTranslateDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductCategoryTranslate)
  translations: ProductCategoryTranslate[];
}
