import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductTagDto } from './dto/create-product-tag.dto';
import { UpdateProductTagDto } from './dto/update-product-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { ProductTag } from './entities/product-tag.entity';
import { ProductTagTranslate } from './entities/product-tag-translate.entity';

@Injectable()
export class ProductTagsService {
  constructor(
    @InjectRepository(ProductTag)
    private productTagsRepository: Repository<ProductTag>,
    @InjectRepository(ProductTagTranslate)
    private productTagsTranslateRepository: Repository<ProductTagTranslate>,
    private i18n: I18nService,
  ) {}

  async create(createProductTagDto: CreateProductTagDto) {
    try {
      createProductTagDto.translations =
        await this.productTagsTranslateRepository.save(
          this.productTagsTranslateRepository.create(
            createProductTagDto.translations,
          ),
        );
      return await this.productTagsRepository.save(
        this.productTagsRepository.create(createProductTagDto),
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.CONFLICT);
    }
  }

  findAll() {
    return `This action returns all productTags`;
  }

  async findOne(fields: EntityCondition<ProductTag>) {
    const categoryFound = await this.productTagsRepository.findOne({
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

  async update(id: number, updateProductTagDto: UpdateProductTagDto) {
    try {
      const updatedTranslates: ProductTagTranslate[] = [];
      for (const translate of updateProductTagDto.translations) {
        updatedTranslates.push(
          await this.productTagsTranslateRepository.save(
            this.productTagsTranslateRepository.create(translate),
          ),
        );
      }

      return this.productTagsRepository.save(
        this.productTagsRepository.create({
          id,
          ...updateProductTagDto,
          translations: updatedTranslates,
        }),
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async softDelete(id: number): Promise<void> {
    await this.productTagsRepository.softDelete(id);
  }
}
