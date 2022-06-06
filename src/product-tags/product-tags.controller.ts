import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductTagsService } from './product-tags.service';
import { CreateProductTagDto } from './dto/create-product-tag.dto';
import { UpdateProductTagDto } from './dto/update-product-tag.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ProductTags')
@Controller({
  path: 'product-tags',
  version: '1',
})
export class ProductTagsController {
  constructor(private readonly productTagsService: ProductTagsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductTagDto: CreateProductTagDto) {
    return this.productTagsService.create(createProductTagDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.productTagsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.productTagsService.findOne({ id: +id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateProductTagDto: UpdateProductTagDto,
  ) {
    return this.productTagsService.update(+id, updateProductTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productTagsService.softDelete(+id);
  }
}
