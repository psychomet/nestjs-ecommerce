import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsOptional} from "class-validator";

export class CreateProductDto {

    @ApiProperty({ example: false })
    @IsBoolean()
    @IsOptional()
    isPrivate: boolean;
}
