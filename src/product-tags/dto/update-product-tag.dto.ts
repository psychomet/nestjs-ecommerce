import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductTagDto } from './create-product-tag.dto';
import { ArrayMinSize, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProductTagTranslateDto } from './update-product-tag-translate.dto';
import { ProductTagTranslate } from '../entities/product-tag-translate.entity';

export class UpdateProductTagDto extends PartialType(CreateProductTagDto) {
  @ApiProperty({ type: UpdateProductTagTranslateDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductTagTranslate)
  translations: ProductTagTranslate[];
}
