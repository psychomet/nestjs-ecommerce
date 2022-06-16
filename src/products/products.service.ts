import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from '../languages/entities/language.entity';
import { Repository } from 'typeorm';
import { FacetValue } from '../facet-values/entities/facet-value.entity';
import { Product } from './entities/product.entity';
import { ProductTranslation } from './entities/product-translation.entity';
import { Facet } from '../facets/entities/facet.entity';
import { EntityCondition } from '../utils/types/entity-condition.type';

@Injectable()
export class ProductsService {
  constructor(
    private i18n: I18nService,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductTranslation)
    private productTranslateRepository: Repository<ProductTranslation>,
    @InjectRepository(FacetValue)
    private facetValueRepository: Repository<FacetValue>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      createProductDto.translations = await Promise.all(
        createProductDto.translations.map(async (item): Promise<any> => {
          const languageFound = await this.languageRepository.findOne(
            item['langId'],
          );
          return { ...item, lang: languageFound };
        }),
      );
      if (
        createProductDto.facetValueIds &&
        createProductDto.facetValueIds.length !== 0
      ) {
        createProductDto['facetValues'] = await Promise.all(
          createProductDto.facetValueIds.map(async (item): Promise<any> => {
            return await this.facetValueRepository.findOne(item);
          }),
        );
      }
      createProductDto.translations =
        await this.productTranslateRepository.save(
          this.productTranslateRepository.create(createProductDto.translations),
        );
      const createdProduct = await this.productRepository.save(
        this.productRepository.create(createProductDto),
      );
      return await this.findOne({ id: createdProduct.id });
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.CONFLICT);
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  async findOne(fields: EntityCondition<Product>) {
    const productFound = await this.productRepository.findOne({
      where: fields,
      relations: ['translations', 'facetValues', 'optionGroups', 'variants'],
    });
    if (productFound) {
      return productFound;
    } else {
      throw new HttpException(
        await this.i18n.t('database.notFound'),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
