import { PartialType } from '@nestjs/swagger';
import { CreateTaxCategoryDto } from './create-tax-category.dto';

export class UpdateTaxCategoryDto extends PartialType(CreateTaxCategoryDto) {}
