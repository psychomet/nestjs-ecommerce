import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductOptionGroupsService } from './product-option-groups.service';
import { CreateProductOptionGroupDto } from './dto/create-product-option-group.dto';
import { UpdateProductOptionGroupDto } from './dto/update-product-option-group.dto';

@Controller('product-option-groups')
export class ProductOptionGroupsController {
  constructor(
    private readonly productOptionGroupsService: ProductOptionGroupsService,
  ) {}

  @Post()
  create(@Body() createProductOptionGroupDto: CreateProductOptionGroupDto) {
    return this.productOptionGroupsService.create(createProductOptionGroupDto);
  }

  @Get()
  findAll() {
    return this.productOptionGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productOptionGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductOptionGroupDto: UpdateProductOptionGroupDto,
  ) {
    return this.productOptionGroupsService.update(
      +id,
      updateProductOptionGroupDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productOptionGroupsService.remove(+id);
  }
}
