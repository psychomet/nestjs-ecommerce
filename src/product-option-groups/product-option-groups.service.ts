import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductOptionGroupDto } from './dto/create-product-option-group.dto';
import { UpdateProductOptionGroupDto } from './dto/update-product-option-group.dto';
import { I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from '../languages/entities/language.entity';
import { Repository } from 'typeorm';
import { ProductOptionGroup } from './entities/product-option-group.entity';
import { ProductOptionGroupTranslation } from './entities/product-option-group-translation.entity';
import { ProductOption } from '../product-options/entities/product-option.entity';
import { ProductOptionTranslation } from '../product-options/entities/product-option-translation.entity';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { Product } from '../products/entities/product.entity';
import { AddOptionGroupToProduct } from './dto/add-option-group-to-product.dto';

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
    const savedProductOptionGroup =
      await this.productOptionGroupRepository.save(
        this.productOptionGroupRepository.create(createProductOptionGroupDto),
      );

    await this.productOptionGroupTranslationRepository.save(
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
        const savedProductOption = await this.productOptionRepository.save(
          this.productOptionRepository.create({
            ...option,
            group: savedProductOptionGroup,
          }),
        );
        await this.productOptionTranslationRepository.save(
          this.productOptionTranslationRepository.create(
            option.translations.map((translation) => ({
              ...translation,
              productOption: savedProductOption,
            })),
          ),
        );
      }
    }

    return await this.findOne({ id: savedProductOptionGroup.id });
  }

  async addOptionGroupToProduct(
    createProductOptionGroupDto: AddOptionGroupToProduct,
  ) {
    const productFound = await this.productRepository.findOne(
      createProductOptionGroupDto.productId,
    );
    const optionGroupFound = await this.productOptionGroupRepository.findOne(
      createProductOptionGroupDto.optionGroupId,
    );
    productFound.optionGroups.push(optionGroupFound);
    await this.productRepository.save(
      this.productRepository.create(productFound),
    );
    await this.productOptionGroupRepository.save(
      this.productOptionGroupRepository.create({
        ...optionGroupFound,
        product: productFound,
      }),
    );
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

  update(id: number, updateProductOptionGroupDto: UpdateProductOptionGroupDto) {
    return `This action updates a #${id} productOptionGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} productOptionGroup`;
  }
}
