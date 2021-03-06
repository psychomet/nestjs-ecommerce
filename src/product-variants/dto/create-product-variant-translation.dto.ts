import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class CreateProductVariantTranslationDto {
  @ApiProperty({ example: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1 })
  @Validate(IsExist, ['Language', 'id'], {
    message: 'langNotExists',
  })
  lang: number;
}
