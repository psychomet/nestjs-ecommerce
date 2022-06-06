import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { Language } from '../../languages/entities/language.entity';

export class CreateProductTagTranslateDto {
  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Language })
  @Validate(IsExist, ['Language', 'id'], {
    message: 'langNotExists',
  })
  lang: Language;
}
