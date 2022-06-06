import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductBrandDto } from './dto/create-product-brand.dto';
import { UpdateProductBrandDto } from './dto/update-product-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { ProductBrand } from './entities/product-brand.entity';
import { ProductBrandTranslate } from './entities/product-brand-translate.entity';

@Injectable()
export class ProductBrandsService {
  constructor(
    @InjectRepository(ProductBrand)
    private productBrandsRepository: Repository<ProductBrand>,
    @InjectRepository(ProductBrandTranslate)
    private productBrandsTranslateRepository: Repository<ProductBrandTranslate>,
    private i18n: I18nService,
  ) {}

  async create(createProductBrandDto: CreateProductBrandDto) {
    try {
      createProductBrandDto.translations =
        await this.productBrandsTranslateRepository.save(
          this.productBrandsTranslateRepository.create(
            createProductBrandDto.translations,
          ),
        );
      return await this.productBrandsRepository.save(
        this.productBrandsRepository.create(createProductBrandDto),
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.CONFLICT);
    }
  }

  findAll() {
    return `This action returns all productCategories`;
  }

  async findOne(fields: EntityCondition<ProductBrand>) {
    const brandFound = await this.productBrandsRepository.findOne({
      where: fields,
      relations: ['translations'],
    });
    if (brandFound) {
      return brandFound;
    } else {
      throw new HttpException(
        await this.i18n.t('database.notFound'),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateProductBrandDto: UpdateProductBrandDto) {
    try {
      const updatedTranslates: ProductBrandTranslate[] = [];
      for (const translate of updateProductBrandDto.translations) {
        updatedTranslates.push(
          await this.productBrandsTranslateRepository.save(
            this.productBrandsTranslateRepository.create(translate),
          ),
        );
      }

      return this.productBrandsRepository.save(
        this.productBrandsRepository.create({
          id,
          ...updateProductBrandDto,
          translations: updatedTranslates,
        }),
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async softDelete(id: number): Promise<void> {
    await this.productBrandsRepository.softDelete(id);
  }
}
