import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFacetDto } from './dto/create-facet.dto';
import { UpdateFacetDto } from './dto/update-facet.dto';
import { I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Facet } from './entities/facet.entity';
import { FacetTranslation } from './entities/facet-translation.entity';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { FacetValueTranslation } from '../facet-values/entities/facet-value-translation.entity';
import { FacetValue } from '../facet-values/entities/facet-value.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Language } from '../languages/entities/language.entity';

// function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
//   return value !== null && value !== undefined;
// }

// const array: (string | null)[] = ['foo', 'bar', null, 'zoo', null];
// const filteredArray: string[] = array.filter(notEmpty);

@Injectable()
export class FacetsService {
  constructor(
    private i18n: I18nService,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(Facet)
    private facetRepository: Repository<Facet>,
    @InjectRepository(FacetTranslation)
    private facetTranslateRepository: Repository<FacetTranslation>,
    @InjectRepository(FacetValue)
    private facetValueRepository: Repository<FacetValue>,
    @InjectRepository(FacetValueTranslation)
    private facetValueTranslateRepository: Repository<FacetValueTranslation>,
  ) {}

  async create(createFacetDto: CreateFacetDto) {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const createdFacet = await queryRunner.manager.save(
        this.facetRepository.create(createFacetDto),
      );
      await queryRunner.manager.save(
        this.facetTranslateRepository.create(
          createFacetDto.translations.map((translate) => ({
            ...translate,
            facet: createdFacet,
          })),
        ),
      );
      await queryRunner.commitTransaction();
      return await this.findOne({ id: createdFacet.id });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(e.detail, HttpStatus.CONFLICT);
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.facetRepository.find({
      relations: ['translations', 'values', 'values.translations'],
    });
  }

  async paginate(options: IPaginationOptions) {
    return paginate<Facet>(this.facetRepository, options, {
      relations: ['translations', 'values', 'values.translations'],
    });
  }

  async findOne(fields: EntityCondition<Facet>) {
    const facetFound = await this.facetRepository.findOne({
      where: fields,
      relations: ['translations', 'values', 'values.translations'],
    });
    if (facetFound) {
      return facetFound;
    } else {
      throw new HttpException(
        await this.i18n.t('database.notFound'),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateFacetDto: UpdateFacetDto) {
    try {
      const facetFound = await this.facetRepository.findOne({ id });
      for (const translate of updateFacetDto.translations) {
        translate['lang'] = await this.languageRepository.findOne(
          translate['langId'],
        );
        translate['facet'] = facetFound;
      }
      for (const value of updateFacetDto.values) {
        value['facet'] = await this.facetRepository.findOne({ id });
        let createdValue: FacetValue;
        if (value.id) {
          createdValue = await this.facetValueRepository.findOne({
            id: value.id,
          });
        } else {
          createdValue = await this.facetValueRepository.save(
            this.facetValueRepository.create(value),
          );
        }
        for (const translate of value.translations) {
          translate['lang'] = await this.languageRepository.findOne(
            translate['langId'],
          );
          translate.facetValue = createdValue;
          await this.facetValueTranslateRepository.save(
            this.facetValueTranslateRepository.create(translate),
          );
        }
      }
      return await this.findOne({ id });
    } catch (e) {
      console.log('e', e);
      throw new HttpException(e.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    await this.facetRepository.softDelete(id);
  }
}
