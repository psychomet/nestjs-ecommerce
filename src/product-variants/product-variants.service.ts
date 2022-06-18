import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from '../languages/entities/language.entity';
import { getConnection, Repository } from 'typeorm';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductVariantTranslation } from './entities/product-variant-translation.entity';
import { ProductVariantPrice } from './entities/product-variant-price.entity';
import { Product } from '../products/entities/product.entity';
import { ProductOption } from '../product-options/entities/product-option.entity';
import { EntityCondition } from '../utils/types/entity-condition.type';

@Injectable()
export class ProductVariantsService {
  constructor(
    private i18n: I18nService,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,
    @InjectRepository(ProductVariantTranslation)
    private productVariantTranslationRepository: Repository<ProductVariantTranslation>,
    @InjectRepository(ProductVariantPrice)
    private productVariantPriceRepository: Repository<ProductVariantPrice>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductOption)
    private productOptionRepository: Repository<ProductOption>,
  ) {}

  async create(createProductVariantDto: CreateProductVariantDto) {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    try {
      createProductVariantDto['product'] = await this.productRepository.findOne(
        createProductVariantDto.productId,
      );

      if (
        createProductVariantDto.optionIds &&
        createProductVariantDto.optionIds.length !== 0
      ) {
        createProductVariantDto['options'] = await Promise.all(
          createProductVariantDto.optionIds.map(
            async (item): Promise<any> =>
              await this.productOptionRepository.findOne(item),
          ),
        );
      }

      const savedProductVariant = await queryRunner.manager.save(
        this.productVariantRepository.create(createProductVariantDto),
      );

      await queryRunner.manager.save(
        this.productVariantTranslationRepository.create(
          createProductVariantDto.translations.map((translation) => ({
            ...translation,
            productVariant: savedProductVariant,
          })),
        ),
      );
      await queryRunner.manager.save(
        this.productVariantPriceRepository.create(
          createProductVariantDto.productVariantPrices.map((price) => ({
            ...price,
            variant: savedProductVariant,
          })),
        ),
      );
      await queryRunner.commitTransaction();
      return await this.findOne({ id: savedProductVariant.id });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(e, HttpStatus.CONFLICT);
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all productVariants`;
  }

  async findOne(fields: EntityCondition<ProductVariant>) {
    const productOptionGroupFound = await this.productVariantRepository.findOne(
      {
        where: fields,
        relations: ['options', 'facetValues', 'productVariantPrices'],
      },
    );
    if (productOptionGroupFound) {
      return productOptionGroupFound;
    } else {
      throw new HttpException(
        await this.i18n.t('database.notFound'),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  update(id: number, updateProductVariantDto: UpdateProductVariantDto) {
    return `This action updates a #${id} productVariant`;
  }

  remove(id: number) {
    return `This action removes a #${id} productVariant`;
  }
}
