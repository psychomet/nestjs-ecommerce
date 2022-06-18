import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductOptionGroupDto } from './dto/create-product-option-group.dto';
import { UpdateProductOptionGroupDto } from './dto/update-product-option-group.dto';
import { I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from '../languages/entities/language.entity';
import { getConnection, Repository } from 'typeorm';
import { ProductOptionGroup } from './entities/product-option-group.entity';
import { ProductOptionGroupTranslation } from './entities/product-option-group-translation.entity';
import { ProductOption } from '../product-options/entities/product-option.entity';
import { ProductOptionTranslation } from '../product-options/entities/product-option-translation.entity';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { Product } from '../products/entities/product.entity';
import { AddOptionGroupToProductDto } from './dto/add-option-group-to-product.dto';

@Injectable()
export class ProductOptionGroupsService {
  constructor(
    private i18n: I18nService,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(ProductOptionGroup)
    private productOptionGroupRepository: Repository<ProductOptionGroup>,
    @InjectRepository(ProductOptionGroupTranslation)
    private productOptionGroupTranslationRepository: Repository<ProductOptionGroupTranslation>,
    @InjectRepository(ProductOption)
    private productOptionRepository: Repository<ProductOption>,
    @InjectRepository(ProductOptionTranslation)
    private productOptionTranslationRepository: Repository<ProductOptionTranslation>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductOptionGroupDto: CreateProductOptionGroupDto) {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const savedProductOptionGroup = await queryRunner.manager.save(
        this.productOptionGroupRepository.create(createProductOptionGroupDto),
      );
      await queryRunner.manager.save(
        this.productOptionGroupTranslationRepository.create(
          createProductOptionGroupDto.translations.map((translation) => ({
            ...translation,
            productOptionGroup: savedProductOptionGroup,
          })),
        ),
      );
      if (
        createProductOptionGroupDto.options &&
        createProductOptionGroupDto.options.length !== 0
      ) {
        for (let option of createProductOptionGroupDto.options) {
          const savedProductOption = await queryRunner.manager.save(
            this.productOptionRepository.create({
              ...option,
              group: savedProductOptionGroup,
            }),
          );
          await queryRunner.manager.save(
            this.productOptionTranslationRepository.create(
              option.translations.map((translation) => ({
                ...translation,
                productOption: savedProductOption,
              })),
            ),
          );
        }
      }
      await queryRunner.commitTransaction();
      return await this.findOne({ id: savedProductOptionGroup.id });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(e, HttpStatus.CONFLICT);
    } finally {
      await queryRunner.release();
    }
  }

  async addOptionGroupToProduct(
    createProductOptionGroupDto: AddOptionGroupToProductDto,
  ) {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const productFound = await this.productRepository.findOne(
        createProductOptionGroupDto.productId,
        {
          relations: ['optionGroups'],
        },
      );
      const optionGroupFound = await this.productOptionGroupRepository.findOne(
        createProductOptionGroupDto.optionGroupId,
      );
      productFound.optionGroups.push(optionGroupFound);
      await queryRunner.manager.save(
        this.productRepository.create(productFound),
      );
      await queryRunner.manager.save(
        this.productOptionGroupRepository.create({
          ...optionGroupFound,
          product: productFound,
        }),
      );
      await queryRunner.commitTransaction();
      return await this.findOne({ id: optionGroupFound.id });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(e, HttpStatus.CONFLICT);
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all productOptionGroups`;
  }

  async findOne(fields: EntityCondition<ProductOptionGroup>) {
    const productOptionGroupFound =
      await this.productOptionGroupRepository.findOne({
        where: fields,
        relations: ['options'],
      });
    if (productOptionGroupFound) {
      return productOptionGroupFound;
    } else {
      throw new HttpException(
        await this.i18n.t('database.notFound'),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateProductOptionGroupDto: UpdateProductOptionGroupDto,
  ) {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
    } catch (e) {
    } finally {
    }
    return `This action updates a #${id} productOptionGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} productOptionGroup`;
  }
}
