import {MigrationInterface, QueryRunner} from "typeorm";

export class v11655372629579 implements MigrationInterface {
    name = 'v11655372629579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "currency" ("id" SERIAL NOT NULL, "code" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "product_variant_price_id" integer, CONSTRAINT "UQ_723472e41cae44beb0763f4039c" UNIQUE ("code"), CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "currency_translation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "langId" integer, "currency_id" integer, CONSTRAINT "PK_55ecd1460cd5fa7254d713b9b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD "enabled" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "currency" ADD CONSTRAINT "FK_7543190e35b46f4af34e058c16d" FOREIGN KEY ("product_variant_price_id") REFERENCES "product_variant_price"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "currency_translation" ADD CONSTRAINT "FK_42a391b158be3e9df66e9a680be" FOREIGN KEY ("langId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "currency_translation" ADD CONSTRAINT "FK_a0599cb9a435ca6f087798bf7a1" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "currency_translation" DROP CONSTRAINT "FK_a0599cb9a435ca6f087798bf7a1"`);
        await queryRunner.query(`ALTER TABLE "currency_translation" DROP CONSTRAINT "FK_42a391b158be3e9df66e9a680be"`);
        await queryRunner.query(`ALTER TABLE "currency" DROP CONSTRAINT "FK_7543190e35b46f4af34e058c16d"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "enabled"`);
        await queryRunner.query(`DROP TABLE "currency_translation"`);
        await queryRunner.query(`DROP TABLE "currency"`);
    }

}
