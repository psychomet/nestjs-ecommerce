import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductOptionGroupsService } from './product-option-groups.service';
import { CreateProductOptionGroupDto } from './dto/create-product-option-group.dto';
import { UpdateProductOptionGroupDto } from './dto/update-product-option-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddOptionGroupToProduct } from './dto/add-option-group-to-product.dto';

@ApiTags('ProductOptionGroups')
@Controller({
  path: 'product-option-groups',
  version: '1',
})
export class ProductOptionGroupsController {
  constructor(
    private readonly productOptionGroupsService: ProductOptionGroupsService,
  ) {}

  @Post()
  create(@Body() createProductOptionGroupDto: CreateProductOptionGroupDto) {
    return this.productOptionGroupsService.create(createProductOptionGroupDto);
  }

  @Put()
  addOptionGroupToProduct(
    @Body() addOptionGroupToProduct: AddOptionGroupToProduct,
  ) {
    return this.productOptionGroupsService.addOptionGroupToProduct(
      addOptionGroupToProduct,
    );
  }

  @Get()
  findAll() {
    return this.productOptionGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productOptionGroupsService.findOne({ id });
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
