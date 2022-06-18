import {MigrationInterface, QueryRunner} from "typeorm";

export class v71655457481782 implements MigrationInterface {
    name = 'v71655457481782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "currency_translation" DROP CONSTRAINT "FK_42a391b158be3e9df66e9a680be"`);
        await queryRunner.query(`ALTER TABLE "facet_translation" DROP CONSTRAINT "FK_c7248226b95c17eb207e344b136"`);
        await queryRunner.query(`ALTER TABLE "currency_translation" RENAME COLUMN "langId" TO "lang_id"`);
        await queryRunner.query(`ALTER TABLE "facet_translation" RENAME COLUMN "langId" TO "lang_id"`);
        await queryRunner.query(`ALTER TABLE "currency_translation" ADD CONSTRAINT "FK_ed2be03815822ef7f57101ce9c3" FOREIGN KEY ("lang_id") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "facet_translation" ADD CONSTRAINT "FK_46606a448e5f969e5cc2516a052" FOREIGN KEY ("lang_id") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facet_translation" DROP CONSTRAINT "FK_46606a448e5f969e5cc2516a052"`);
        await queryRunner.query(`ALTER TABLE "currency_translation" DROP CONSTRAINT "FK_ed2be03815822ef7f57101ce9c3"`);
        await queryRunner.query(`ALTER TABLE "facet_translation" RENAME COLUMN "lang_id" TO "langId"`);
        await queryRunner.query(`ALTER TABLE "currency_translation" RENAME COLUMN "lang_id" TO "langId"`);
        await queryRunner.query(`ALTER TABLE "facet_translation" ADD CONSTRAINT "FK_c7248226b95c17eb207e344b136" FOREIGN KEY ("langId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "currency_translation" ADD CONSTRAINT "FK_42a391b158be3e9df66e9a680be" FOREIGN KEY ("langId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
