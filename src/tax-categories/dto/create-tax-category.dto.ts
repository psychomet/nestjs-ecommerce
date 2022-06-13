import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaxCategoryDto {
  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isDefault: boolean;
}
