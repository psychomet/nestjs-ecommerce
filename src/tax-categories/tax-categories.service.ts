import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaxCategoryDto } from './dto/create-tax-category.dto';
import { UpdateTaxCategoryDto } from './dto/update-tax-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxCategory } from './entities/tax-category.entity';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { I18nService } from 'nestjs-i18n';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class TaxCategoriesService {
  constructor(
    private i18n: I18nService,
    @InjectRepository(TaxCategory)
    private taxCategoriesRepository: Repository<TaxCategory>,
  ) {}

  async create(createTaxCategoryDto: CreateTaxCategoryDto) {
    try {
      return await this.taxCategoriesRepository.save(
        this.taxCategoriesRepository.create(createTaxCategoryDto),
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.CONFLICT);
    }
  }

  findAll() {
    return this.taxCategoriesRepository.find();
  }

  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<TaxCategory>> {
    return paginate<TaxCategory>(this.taxCategoriesRepository, options);
  }

  async findOne(fields: EntityCondition<TaxCategory>) {
    const categoryFound = await this.taxCategoriesRepository.findOne({
      where: fields,
    });
    if (categoryFound) {
      return categoryFound;
    } else {
      throw new HttpException(
        await this.i18n.t('database.notFound'),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateTaxCategoryDto: UpdateTaxCategoryDto) {
    try {
      return this.taxCategoriesRepository.save(
        this.taxCategoriesRepository.create({
          id,
          ...updateTaxCategoryDto,
        }),
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    await this.taxCategoriesRepository.softDelete(id);
  }
}
