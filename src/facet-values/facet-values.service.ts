import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFacetValueDto } from './dto/create-facet-value.dto';
import { UpdateFacetValueDto } from './dto/update-facet-value.dto';
import { I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacetValue } from './entities/facet-value.entity';
import { FacetValueTranslation } from './entities/facet-value-translation.entity';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { Facet } from '../facets/entities/facet.entity';

@Injectable()
export class FacetValuesService {
  constructor(
    private i18n: I18nService,
    @InjectRepository(Facet)
    private facetRepository: Repository<Facet>,
    @InjectRepository(FacetValue)
    private facetValueRepository: Repository<FacetValue>,
    @InjectRepository(FacetValueTranslation)
    private facetValueTranslateRepository: Repository<FacetValueTranslation>,
  ) {}

  async create(createFacetValueDto: CreateFacetValueDto) {
    try {
      const facetFound = await this.facetRepository.findOne({
        id: createFacetValueDto.facetId,
      });

      createFacetValueDto.translations =
        await this.facetValueTranslateRepository.save(
          this.facetValueTranslateRepository.create(
            createFacetValueDto.translations,
          ),
        );
      return await this.facetValueRepository.save(
        this.facetValueRepository.create({
          ...createFacetValueDto,
          facet: facetFound,
        }),
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.facetValueRepository.find();
  }

  async findOne(fields: EntityCondition<FacetValue>) {
    const facetValueFound = await this.facetValueRepository.findOne({
      where: fields,
      relations: ['translations', 'facet'],
    });
    if (facetValueFound) {
      return facetValueFound;
    } else {
      throw new HttpException(
        await this.i18n.t('database.notFound'),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateFacetValueDto: UpdateFacetValueDto) {
    try {
      const facetFound = await this.facetRepository.findOne({
        id: updateFacetValueDto.facetId,
      });
      const updatedTranslates: FacetValueTranslation[] = [];
      for (const translate of updateFacetValueDto.translations) {
        updatedTranslates.push(
          await this.facetValueTranslateRepository.save(
            this.facetValueTranslateRepository.create(translate),
          ),
        );
      }

      return this.facetValueRepository.save(
        this.facetValueRepository.create({
          id,
          ...updateFacetValueDto,
          translations: updatedTranslates,
          facet: facetFound,
        }),
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    await this.facetValueRepository.softDelete(id);
  }
}
