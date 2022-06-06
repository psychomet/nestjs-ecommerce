import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { Language } from '../../languages/entities/language.entity';

export class CreateProductBrandTranslateDto {
  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'desc' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Language })
  @Validate(IsExist, ['Language', 'id'], {
    message: 'langNotExists',
  })
  lang: Language;
}
