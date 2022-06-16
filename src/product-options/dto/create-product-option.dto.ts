import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductOptionTranslationDto } from './create-product-option-translation.dto';
import { ProductOptionTranslation } from '../entities/product-option-translation.entity';

export class CreateProductOptionDto {
  @ApiProperty({ type: CreateProductOptionTranslationDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateProductOptionTranslationDto)
  translations: ProductOptionTranslation[];
}
