import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from '../languages/entities/language.entity';
import { getConnection, Repository } from 'typeorm';
import { FacetValue } from '../facet-values/entities/facet-value.entity';
import { Product } from './entities/product.entity';
import { ProductTranslation } from './entities/product-translation.entity';
import { EntityCondition } from '../utils/types/entity-condition.type';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { ProductVariant } from '../product-variants/entities/product-variant.entity';

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
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const savedProduct = await queryRunner.manager.save(
        this.productRepository.create({
          ...createProductDto,
          facetValues: await Promise.all(
            createProductDto.facetValueIds.map(
              async (item): Promise<FacetValue> =>
                await this.facetValueRepository.findOne(item),
            ),
          ),
        }),
      );
      await queryRunner.manager.save(
        this.productTranslateRepository.create(
          createProductDto.translations.map((translate) => ({
            ...translate,
            product: savedProduct,
          })),
        ),
      );
      await queryRunner.commitTransaction();
      return await this.findOne({ id: savedProduct.id });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(e, HttpStatus.CONFLICT);
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  async paginate(
    options: IPaginationOptions,
    isGroup,
  ): Promise<Pagination<Product | ProductVariant>> {
    console.log('isGroup', typeof isGroup);
    if (isGroup) {
      return await paginate<Product>(this.productRepository, options);
    } else {
      return await paginate<ProductVariant>(
        this.productVariantRepository,
        options,
        {
          relations: ['product'],
        },
      );
    }
  }

  async findOne(fields: EntityCondition<Product>) {
    const productFound = await this.productRepository.findOne({
      where: fields,
      relations: ['facetValues', 'optionGroups', 'variants'],
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
