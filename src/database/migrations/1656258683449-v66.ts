import {MigrationInterface, QueryRunner} from "typeorm";

export class v661656258683449 implements MigrationInterface {
    name = 'v661656258683449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "collection" ("id" SERIAL NOT NULL, "isRoot" boolean NOT NULL DEFAULT false, "position" integer NOT NULL, "isPrivate" boolean NOT NULL DEFAULT false, "filters" text NOT NULL, "parentId" integer, CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collection_translation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying, "description" text NOT NULL, "collection_id" integer, "lang_id" integer, CONSTRAINT "UQ_9f9da7d94b0278ea0f7831e1fcf" UNIQUE ("slug"), CONSTRAINT "PK_bb49cfcde50401eb5f463a84dac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collection_product_variants_product_variant" ("collectionId" integer NOT NULL, "productVariantId" integer NOT NULL, CONSTRAINT "PK_50c5ed0504ded53967be811f633" PRIMARY KEY ("collectionId", "productVariantId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6faa7b72422d9c4679e2f186ad" ON "collection_product_variants_product_variant" ("collectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb05887e2867365f236d7dd95e" ON "collection_product_variants_product_variant" ("productVariantId") `);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_4257b61275144db89fa0f5dc059" FOREIGN KEY ("parentId") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection_translation" ADD CONSTRAINT "FK_4ea17a3f90f0387c3056585fce1" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "collection_translation" ADD CONSTRAINT "FK_d22cc9bf43e53df9405cc45fae5" FOREIGN KEY ("lang_id") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection_product_variants_product_variant" ADD CONSTRAINT "FK_6faa7b72422d9c4679e2f186ad1" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "collection_product_variants_product_variant" ADD CONSTRAINT "FK_fb05887e2867365f236d7dd95ee" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection_product_variants_product_variant" DROP CONSTRAINT "FK_fb05887e2867365f236d7dd95ee"`);
        await queryRunner.query(`ALTER TABLE "collection_product_variants_product_variant" DROP CONSTRAINT "FK_6faa7b72422d9c4679e2f186ad1"`);
        await queryRunner.query(`ALTER TABLE "collection_translation" DROP CONSTRAINT "FK_d22cc9bf43e53df9405cc45fae5"`);
        await queryRunner.query(`ALTER TABLE "collection_translation" DROP CONSTRAINT "FK_4ea17a3f90f0387c3056585fce1"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_4257b61275144db89fa0f5dc059"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb05887e2867365f236d7dd95e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6faa7b72422d9c4679e2f186ad"`);
        await queryRunner.query(`DROP TABLE "collection_product_variants_product_variant"`);
        await queryRunner.query(`DROP TABLE "collection_translation"`);
        await queryRunner.query(`DROP TABLE "collection"`);
    }

}
