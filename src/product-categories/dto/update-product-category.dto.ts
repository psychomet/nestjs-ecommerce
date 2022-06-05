import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductCategoryDto } from './create-product-category.dto';
import { ArrayMinSize, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductCategoryTranslate } from '../entities/product-category-translate.entity';
import { UpdateProductCategoryTranslateDto } from './update-product-category-translate.dto';

export class UpdateProductCategoryDto extends PartialType(
  CreateProductCategoryDto,
) {
  @ApiProperty({ type: UpdateProductCategoryTranslateDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductCategoryTranslate)
  translations: ProductCategoryTranslate[];
}
