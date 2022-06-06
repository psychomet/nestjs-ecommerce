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
import { ProductBrandsService } from './product-brands.service';
import { CreateProductBrandDto } from './dto/create-product-brand.dto';
import { UpdateProductBrandDto } from './dto/update-product-brand.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ProductBrands')
@Controller({
  path: 'product-brands',
  version: '1',
})
export class ProductBrandsController {
  constructor(private readonly productBrandsService: ProductBrandsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductBrandDto: CreateProductBrandDto) {
    return this.productBrandsService.create(createProductBrandDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.productBrandsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.productBrandsService.findOne({ id: +id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateProductBrandDto: UpdateProductBrandDto,
  ) {
    return this.productBrandsService.update(+id, updateProductBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productBrandsService.softDelete(+id);
  }
}
