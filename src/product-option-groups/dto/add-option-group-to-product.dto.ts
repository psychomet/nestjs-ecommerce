import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class AddOptionGroupToProduct {
  @ApiProperty({ example: 1 })
  @Validate(IsExist, ['ProductOptionGroup', 'id'], {
    message: 'productOptionGroupNotExists',
  })
  optionGroupId: number;

  @ApiProperty({ example: 1 })
  @Validate(IsExist, ['Product', 'id'], {
    message: 'productNotExists',
  })
  productId: number;
}
