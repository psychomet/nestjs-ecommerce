import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Language } from '../../languages/entities/language.entity';
import { plainToClass } from 'class-transformer';

export default class CreateLanguage implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const count = await connection
      .createQueryBuilder()
      .select()
      .from(Language, 'Language')
      .getCount();

    if (count === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Language)
        .values([
          plainToClass(Language, {
            name: 'FA',
          }),
          plainToClass(Language, {
            name: 'EN',
          }),
        ])
        .execute();
    }
  }
}
