import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { TaxCategory } from '../../tax-categories/entities/tax-category.entity';

export class CreateTaxRateDto {
  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Doe' })
  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ example: 1 })
  @Validate(IsExist, ['TaxCategory', 'id'], {
    message: 'taxCategoryNotExists',
  })
  taxCategoryId: number;
}
