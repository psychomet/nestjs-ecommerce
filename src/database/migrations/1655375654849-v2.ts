import {MigrationInterface, QueryRunner} from "typeorm";

export class v21655375654849 implements MigrationInterface {
    name = 'v21655375654849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "currency" DROP CONSTRAINT "FK_7543190e35b46f4af34e058c16d"`);
        await queryRunner.query(`ALTER TABLE "currency" DROP COLUMN "product_variant_price_id"`);
        await queryRunner.query(`ALTER TABLE "product_variant_price" ADD "currency_id" integer`);
        await queryRunner.query(`ALTER TABLE "product_variant_price" ADD CONSTRAINT "FK_016bf2c0972f9504ee0d934c1e3" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant_price" DROP CONSTRAINT "FK_016bf2c0972f9504ee0d934c1e3"`);
        await queryRunner.query(`ALTER TABLE "product_variant_price" DROP COLUMN "currency_id"`);
        await queryRunner.query(`ALTER TABLE "currency" ADD "product_variant_price_id" integer`);
        await queryRunner.query(`ALTER TABLE "currency" ADD CONSTRAINT "FK_7543190e35b46f4af34e058c16d" FOREIGN KEY ("product_variant_price_id") REFERENCES "product_variant_price"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
