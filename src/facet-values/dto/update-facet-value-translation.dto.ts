import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class UpdateFacetValueTranslationDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  id: number;

  @ApiProperty({ example: 'name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'code' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 1 })
  @Validate(IsExist, ['Language', 'id'], {
    message: 'langNotExists',
  })
  lang: number;
}
