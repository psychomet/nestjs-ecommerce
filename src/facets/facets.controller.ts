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
import { FacetsService } from './facets.service';
import { CreateFacetDto } from './dto/create-facet.dto';
import { UpdateFacetDto } from './dto/update-facet.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Facets')
@Controller({
  path: 'facets',
  version: '1',
})
export class FacetsController {
  constructor(private readonly facetsService: FacetsService) {}

  @Post()
  create(@Body() createFacetDto: CreateFacetDto) {
    return this.facetsService.create(createFacetDto);
  }

  @Get()
  findAll() {
    return this.facetsService.findAll();
  }

  @Get('paginate')
  async paginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.facetsService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.facetsService.findOne({ id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateFacetDto: UpdateFacetDto) {
    console.log('updateFacetDto');
    return this.facetsService.update(+id, updateFacetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facetsService.remove(+id);
  }
}
