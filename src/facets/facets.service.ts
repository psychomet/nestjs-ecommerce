import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateFacetDto} from './dto/create-facet.dto';
import {UpdateFacetDto} from './dto/update-facet.dto';
import {I18nService} from 'nestjs-i18n';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Facet} from './entities/facet.entity';
import {FacetTranslation} from './entities/facet-translation.entity';
import {EntityCondition} from '../utils/types/entity-condition.type';
import {FacetValueTranslation} from '../facet-values/entities/facet-value-translation.entity';
import {FacetValue} from '../facet-values/entities/facet-value.entity';
import {IPaginationOptions, paginate} from 'nestjs-typeorm-paginate';
import {Language} from '../languages/entities/language.entity';

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
    ) {
    }

    async create(createFacetDto: CreateFacetDto) {
        try {
            createFacetDto.translations = await Promise.all(
                createFacetDto.translations.map(async (item): Promise<any> => {
                    const languageFound = await this.languageRepository.findOne(
                        item['langId'],
                    );
                    return {...item, lang: languageFound};
                }),
            );
            console.log('createFacetDto', createFacetDto);
            createFacetDto.translations = await this.facetTranslateRepository.save(
                this.facetTranslateRepository.create(createFacetDto.translations),
            );
            return await this.facetRepository.save(
                this.facetRepository.create(createFacetDto as Facet),
            );
        } catch (e) {
            throw new HttpException(e.detail, HttpStatus.CONFLICT);
        }
    }

    findAll() {
        return this.facetRepository.find({
            relations: ['translations', 'translations.lang', 'values'],
        });
    }

    async paginate(options: IPaginationOptions) {
        return paginate<Facet>(this.facetRepository, options, {
            relations: ['translations', 'values'],
        });
    }

    async findOne(fields: EntityCondition<Facet>) {
        const facetFound = await this.facetRepository.findOne({
            where: fields,
            relations: ['translations', 'values'],
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
        function removeEmpty(obj) {
            return Object.fromEntries(
                Object.entries(obj)
                    .filter(([_, v]) => v != null)
                    .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v]),
            );
        }

        updateFacetDto = removeEmpty(updateFacetDto);

        try {
            // console.log('asdasd', updateFacetDto);
            // const found = await this.findOne({ id });
            // updateFacetDto = { ...updateFacetDto, ...found };
            console.log('updateFacetDto', updateFacetDto);
            // const updatedTranslates: FacetTranslation[]= [];
            for (const translate of updateFacetDto.translations) {
                translate['lang'] = await this.languageRepository.findOne(
                    translate['langId'],
                );
                translate['facet'] = await this.facetRepository.findOne(
                    {id}
                );
                // let translateFound = await this.facetTranslateRepository.find({
                //   id: translate.id,
                // });
                // if (translateFound) {
                //   translateFound = { ...translateFound, ...translate };
                // }
                await this.facetTranslateRepository.save(this.facetTranslateRepository.create(translate))
            }

            for (const value of updateFacetDto.values) {
                value['facet'] = await this.facetRepository.findOne(
                    {id}
                );
                const createdValue = await this.facetValueRepository.save(this.facetValueRepository.create(value));
                for (const translate of value.translations) {
                    translate['lang'] = await this.languageRepository.findOne(
                        translate['langId'],
                    );
                    translate.facetValue = createdValue;
                    await this.facetValueTranslateRepository.save(this.facetValueTranslateRepository.create(translate))
                }
            }
            // const updatedTranslates: FacetValueTranslation[] = [];
            // for (const translate of updateFacetDto.translations) {
            //   translate['lang'] = await this.languageRepository.findOne(
            //     translate['langId'],
            //   );
            //   // let translateFound = await this.facetTranslateRepository.find({
            //   //   id: translate.id,
            //   // });
            //   // if (translateFound) {
            //   //   translateFound = { ...translateFound, ...translate };
            //   // }
            //   updatedTranslates.push(
            //     await this.facetTranslateRepository.save(
            //       this.facetTranslateRepository.create(translate),
            //     ),
            //   );
            // }

            // const savedFacet = await this.facetRepository.save(
            //   this.facetRepository.create({
            //     id,
            //     ...updateFacetDto,
            //     translations: updatedTranslates,
            //   }),
            // );

            // if (updateFacetDto.values && updateFacetDto.values.length !== 0) {
            //   for (const value of updateFacetDto.values) {
            //     // const facet = await this.facetRepository.find({ id });
            //     const cn = {
            //       ...value,
            //       facet: await this.facetRepository.find({ id }),
            //     };
            //     console.log('cn', cn);
            //     // const createdValues = await this.facetValueRepository.save(
            //     //   this.facetValueRepository.create(cn),
            //     // );
            //     const updatedTranslates: FacetValueTranslation[] = [];
            //     for (const translate of value.translations) {
            //       // updatedTranslates.push(
            //       //   await this.facetValueTranslateRepository.save(
            //       //     this.facetValueTranslateRepository.create({
            //       //       ...translate,
            //       //       facetValue: createdValues,
            //       //     }),
            //       //   ),
            //       // );
            //     }
            //
            //     savedFacet.values.push(
            //       await this.facetValueRepository.save(
            //         this.facetValueRepository.create({
            //           ...updateFacetDto.values,
            //           translations: updatedTranslates,
            //         }),
            //       ),
            //     );
            //   }
            // }
            // return savedFacet;
            return 'ok'
        } catch (e) {
            console.log('e',e)
            throw new HttpException(e.detail, HttpStatus.BAD_REQUEST);
        }
    }

    async remove(id: number) {
        await this.facetRepository.softDelete(id);
    }
}
