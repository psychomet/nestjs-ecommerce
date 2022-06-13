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
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TaxCategoriesService } from './tax-categories.service';
import { CreateTaxCategoryDto } from './dto/create-tax-category.dto';
import { UpdateTaxCategoryDto } from './dto/update-tax-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TaxCategories')
@Controller({
  path: 'tax-categories',
  version: '1',
})
export class TaxCategoriesController {
  constructor(private readonly taxCategoriesService: TaxCategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaxCategoryDto: CreateTaxCategoryDto) {
    return this.taxCategoriesService.create(createTaxCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.taxCategoriesService.findAll();
  }

  @Get('paginate')
  @HttpCode(HttpStatus.OK)
  async paginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.taxCategoriesService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.taxCategoriesService.findOne({ id: +id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateTaxCategoryDto: UpdateTaxCategoryDto,
  ) {
    return this.taxCategoriesService.update(+id, updateTaxCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxCategoriesService.remove(+id);
  }
}
