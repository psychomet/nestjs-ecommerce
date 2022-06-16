import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, InsertResult } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Currency } from '../../currencies/entities/currency.entity';
import { CurrencyTranslation } from '../../currencies/entities/currency-translation.entity';

export default class CreateCurrency implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const count = await connection
      .createQueryBuilder()
      .select()
      .from(Currency, 'Currency')
      .getCount();

    if (count === 0) {
      const createdCurrencies: InsertResult = await connection
        .createQueryBuilder()
        .insert()
        .into(Currency)
        .values([
          plainToClass(Currency, {
            code: 'IRR',
          }),
          plainToClass(Currency, {
            code: 'USD',
          }),
        ])
        .execute();
      await connection
        .createQueryBuilder()
        .insert()
        .into(CurrencyTranslation)
        .values([
          plainToClass(CurrencyTranslation, {
            name: 'ریال',
            lang: 1,
            currency: createdCurrencies.generatedMaps[0],
          }),
          plainToClass(CurrencyTranslation, {
            name: 'دلار',
            lang: 1,
            currency: createdCurrencies.generatedMaps[1],
          }),
        ])
        .execute();
    }
  }
}
