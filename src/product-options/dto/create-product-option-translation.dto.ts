import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class CreateProductOptionTranslationDto {
  @ApiProperty({ example: 'code', type: String, required: true })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 'code', type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1 })
  @Validate(IsExist, ['Language', 'id'], {
    message: 'langNotExists',
  })
  lang: number;
}
