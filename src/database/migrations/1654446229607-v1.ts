import {MigrationInterface, QueryRunner} from "typeorm";

export class v11654446229607 implements MigrationInterface {
    name = 'v11654446229607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "hash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `);
        await queryRunner.query(`CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `);
        await queryRunner.query(`CREATE TABLE "forgot" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_df507d27b0fb20cd5f7bef9b9a" ON "forgot" ("hash") `);
        await queryRunner.query(`CREATE TABLE "language" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_brand_translate" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying, "description" character varying NOT NULL, "langId" integer, "brand_id" integer, CONSTRAINT "UQ_1e2a74758d5e53059d9a38ac049" UNIQUE ("slug"), CONSTRAINT "PK_44088bb49c2e3988f806cd88de1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_brand" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_2eb5ce4324613b4b457c364f4a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_category_translate" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying, "description" character varying NOT NULL, "langId" integer, "category_id" integer, CONSTRAINT "UQ_e17dec812a86d58a14a7af79c45" UNIQUE ("slug"), CONSTRAINT "PK_e597f8a95b1fea4ec120a4f885d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_tag" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_1439455c6528caa94fcc8564fda" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_tag_translate" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying, "langId" integer, "tag_id" integer, CONSTRAINT "UQ_d6b1ef0f6d1d503b649b1dfc753" UNIQUE ("slug"), CONSTRAINT "PK_a13a3cce35881bd32073c6c7f48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_brand_translate" ADD CONSTRAINT "FK_c1f6b5051c0d74c797e958eb5bf" FOREIGN KEY ("langId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_brand_translate" ADD CONSTRAINT "FK_490c705d7e11f1c5b80a1c701cc" FOREIGN KEY ("brand_id") REFERENCES "product_brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_category_translate" ADD CONSTRAINT "FK_149ae02ac0657e029baedb85259" FOREIGN KEY ("langId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_category_translate" ADD CONSTRAINT "FK_a631e5034a814ed05e7fed04031" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_tag_translate" ADD CONSTRAINT "FK_070ecab82f309409cee5b7e45ff" FOREIGN KEY ("langId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_tag_translate" ADD CONSTRAINT "FK_a0676e7fe2e1918397b8fabda51" FOREIGN KEY ("tag_id") REFERENCES "product_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tag_translate" DROP CONSTRAINT "FK_a0676e7fe2e1918397b8fabda51"`);
        await queryRunner.query(`ALTER TABLE "product_tag_translate" DROP CONSTRAINT "FK_070ecab82f309409cee5b7e45ff"`);
        await queryRunner.query(`ALTER TABLE "product_category_translate" DROP CONSTRAINT "FK_a631e5034a814ed05e7fed04031"`);
        await queryRunner.query(`ALTER TABLE "product_category_translate" DROP CONSTRAINT "FK_149ae02ac0657e029baedb85259"`);
        await queryRunner.query(`ALTER TABLE "product_brand_translate" DROP CONSTRAINT "FK_490c705d7e11f1c5b80a1c701cc"`);
        await queryRunner.query(`ALTER TABLE "product_brand_translate" DROP CONSTRAINT "FK_c1f6b5051c0d74c797e958eb5bf"`);
        await queryRunner.query(`ALTER TABLE "forgot" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`);
        await queryRunner.query(`DROP TABLE "product_tag_translate"`);
        await queryRunner.query(`DROP TABLE "product_tag"`);
        await queryRunner.query(`DROP TABLE "product_category_translate"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`DROP TABLE "product_brand"`);
        await queryRunner.query(`DROP TABLE "product_brand_translate"`);
        await queryRunner.query(`DROP TABLE "language"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df507d27b0fb20cd5f7bef9b9a"`);
        await queryRunner.query(`DROP TABLE "forgot"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e282acb94d2e3aec10f480e4f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
