import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductBrandDto } from './create-product-brand.dto';
import { ArrayMinSize, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProductBrandTranslateDto } from './update-product-brand-translate.dto';
import { ProductBrandTranslate } from '../entities/product-brand-translate.entity';

export class UpdateProductBrandDto extends PartialType(CreateProductBrandDto) {
  @ApiProperty({ type: UpdateProductBrandTranslateDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductBrandTranslate)
  translations: ProductBrandTranslate[];
}
