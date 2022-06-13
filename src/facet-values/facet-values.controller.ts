import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FacetValuesService } from './facet-values.service';
import { CreateFacetValueDto } from './dto/create-facet-value.dto';
import { UpdateFacetValueDto } from './dto/update-facet-value.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('FacetValue')
@Controller({
  path: 'facet-values',
  version: '1',
})
export class FacetValuesController {
  constructor(private readonly facetValuesService: FacetValuesService) {}

  @Post()
  create(@Body() createFacetValueDto: CreateFacetValueDto) {
    return this.facetValuesService.create(createFacetValueDto);
  }

  @Get()
  findAll() {
    return this.facetValuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facetValuesService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacetValueDto: UpdateFacetValueDto,
  ) {
    console.log('updateFacetValueDto', updateFacetValueDto);
    return this.facetValuesService.update(+id, updateFacetValueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facetValuesService.remove(+id);
  }
}
