import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductTagTranslateDto } from './create-product-tag-translate.dto';
import { ProductTagTranslate } from '../entities/product-tag-translate.entity';

export class CreateProductTagDto {
  @ApiProperty({ type: CreateProductTagTranslateDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductTagTranslate)
  translations: ProductTagTranslate[];
}
