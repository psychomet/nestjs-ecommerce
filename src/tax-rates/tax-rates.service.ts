import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaxRateDto } from './dto/create-tax-rate.dto';
import { UpdateTaxRateDto } from './dto/update-tax-rate.dto';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxRate } from './entities/tax-rate.entity';
import { TaxCategoriesService } from '../tax-categories/tax-categories.service';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class TaxRatesService {
  constructor(
    private i18n: I18nService,
    private taxCategoriesService: TaxCategoriesService,
    @InjectRepository(TaxRate)
    private taxRatesRepository: Repository<TaxRate>,
  ) {}

  async create(createTaxRateDto: CreateTaxRateDto) {
    try {
      const categoryFound = await this.taxCategoriesService.findOne({
        id: createTaxRateDto.taxCategoryId,
      });
      return await this.taxRatesRepository.save(
        this.taxRatesRepository.create({
          ...createTaxRateDto,
          category: categoryFound,
        }),
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.taxRatesRepository.find();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<TaxRate>> {
    return paginate<TaxRate>(this.taxRatesRepository, options);
  }

  async findOne(fields: EntityCondition<TaxRate>) {
    const categoryFound = await this.taxRatesRepository.findOne({
      where: fields,
      relations: ['category'],
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

  async update(id: number, updateTaxRateDto: UpdateTaxRateDto) {
    try {
      const categoryFound = await this.taxCategoriesService.findOne({
        id: updateTaxRateDto.taxCategoryId,
      });
      return await this.taxRatesRepository.save(
        this.taxRatesRepository.create({
          id,
          ...updateTaxRateDto,
          category: categoryFound,
        }),
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    await this.taxRatesRepository.softDelete(id);
  }
}
