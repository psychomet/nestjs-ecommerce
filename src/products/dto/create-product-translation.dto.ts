import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class CreateProductTranslationDto {
  @ApiProperty({ example: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'name' })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({ example: 'code' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: 1 })
  @Validate(IsExist, ['Language', 'id'], {
    message: 'langNotExists',
  })
  lang: number;
}
