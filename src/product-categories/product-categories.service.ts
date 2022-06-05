import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { ProductCategoryTranslate } from './entities/product-category-translate.entity';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoriesRepository: Repository<ProductCategory>,
    @InjectRepository(ProductCategoryTranslate)
    private productCategoriesTranslateRepository: Repository<ProductCategoryTranslate>,
    private i18n: I18nService,
  ) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    try {
      createProductCategoryDto.translations =
        await this.productCategoriesTranslateRepository.save(
          this.productCategoriesTranslateRepository.create(
            createProductCategoryDto.translations,
          ),
        );
      return await this.productCategoriesRepository.save(
        this.productCategoriesRepository.create(createProductCategoryDto),
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.CONFLICT);
    }
  }

  findAll() {
    return `This action returns all productCategories`;
  }

  async findOne(fields: EntityCondition<ProductCategory>) {
    const categoryFound = await this.productCategoriesRepository.findOne({
      where: fields,
      relations: ['translations'],
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

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    try {
      const updatedTranslates: ProductCategoryTranslate[] = [];
      for (const translate of updateProductCategoryDto.translations) {
        updatedTranslates.push(
          await this.productCategoriesTranslateRepository.save(
            this.productCategoriesTranslateRepository.create(translate),
          ),
        );
      }

      return this.productCategoriesRepository.save(
        this.productCategoriesRepository.create({
          id,
          ...updateProductCategoryDto,
          translations: updatedTranslates,
        }),
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async softDelete(id: number): Promise<void> {
    await this.productCategoriesRepository.softDelete(id);
  }
}
