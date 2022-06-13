import { PartialType } from '@nestjs/swagger';
import { CreateProductOptionGroupDto } from './create-product-option-group.dto';

export class UpdateProductOptionGroupDto extends PartialType(
  CreateProductOptionGroupDto,
) {}
