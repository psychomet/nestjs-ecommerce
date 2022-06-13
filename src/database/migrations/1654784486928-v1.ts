import { MigrationInterface, QueryRunner } from 'typeorm';

export class v11654784486928 implements MigrationInterface {
  name = 'v11654784486928';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "language" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "facet_translation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying, "langId" integer, "facet_id" integer, CONSTRAINT "UQ_088f10a70a408c6e059684d2888" UNIQUE ("code"), CONSTRAINT "PK_a6902cc1dcbb5e52a980f0189ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "facet" ("id" SERIAL NOT NULL, "isPrivate" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a0ebfe3c68076820c6886aa9ff3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "facet_value" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "facetId" integer, CONSTRAINT "PK_d231e8eecc7e1a6059e1da7d325" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "facet_value_translation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying, "langId" integer, "facet_value_id" integer, CONSTRAINT "UQ_5e734fe284cf4f2c330bd834e53" UNIQUE ("code"), CONSTRAINT "PK_a09fdeb788deff7a9ed827a6160" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "hash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `,
    );
    await queryRunner.query(
      `CREATE TABLE "forgot" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df507d27b0fb20cd5f7bef9b9a" ON "forgot" ("hash") `,
    );
    await queryRunner.query(
      `CREATE TABLE "product_option_translation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying, "product_option_id" integer, "langId" integer, CONSTRAINT "UQ_a4a53c07538a751d95201cf3fe7" UNIQUE ("code"), CONSTRAINT "PK_69c79a84baabcad3c7328576ac0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_option" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "group_id" integer, CONSTRAINT "PK_4cf3c467e9bc764bdd32c4cd938" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_translation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying, "description" text NOT NULL, "product_id" integer, "langId" integer, CONSTRAINT "UQ_f4a2ec16ba86d277b6faa0b67b9" UNIQUE ("slug"), CONSTRAINT "PK_62d00fbc92e7a495701d6fee9d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tax_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "isDefault" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_2432988f825c336d5584a96cded" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_price" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "tax_category_id" integer, "product_variant_id" integer, CONSTRAINT "PK_ba659ff2940702124e799c5c854" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant" ("id" SERIAL NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "sku" character varying NOT NULL, "stockOnHand" integer NOT NULL DEFAULT '0', "stockAllocated" integer NOT NULL DEFAULT '0', "outOfStockThreshold" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "product_id" integer, CONSTRAINT "PK_1ab69c9935c61f7c70791ae0a9f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_option_group" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "product_id" integer, CONSTRAINT "PK_d76e92fdbbb5a2e6752ffd4a2c1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_option_group_translation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying, "langId" integer, "product_option_group_id" integer, CONSTRAINT "UQ_0b6f037d5c508f6c7ae32bd069f" UNIQUE ("code"), CONSTRAINT "PK_44ab19f118175288dff147c4a00" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_translation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "langId" integer, CONSTRAINT "PK_4b7f882e2b669800bed7ed065f0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tax_rate" ("id" SERIAL NOT NULL, "enabled" boolean NOT NULL, "name" character varying NOT NULL, "value" numeric(5,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "tax_category_id" integer, CONSTRAINT "PK_23b71b53f650c0b39e99ccef4fd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_options_product_option" ("productVariantId" integer NOT NULL, "productOptionId" integer NOT NULL, CONSTRAINT "PK_c57de5cb6bb74504180604a00c0" PRIMARY KEY ("productVariantId", "productOptionId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_526f0131260eec308a3bd2b61b" ON "product_variant_options_product_option" ("productVariantId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e96a71affe63c97f7fa2f076da" ON "product_variant_options_product_option" ("productOptionId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_facet_values_facet_value" ("productVariantId" integer NOT NULL, "facetValueId" integer NOT NULL, CONSTRAINT "PK_a28474836b2feeffcef98c806e1" PRIMARY KEY ("productVariantId", "facetValueId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_69567bc225b6bbbd732d6c5455" ON "product_variant_facet_values_facet_value" ("productVariantId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0d641b761ed1dce4ef3cd33d55" ON "product_variant_facet_values_facet_value" ("facetValueId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "product_facet_values_facet_value" ("productId" integer NOT NULL, "facetValueId" integer NOT NULL, CONSTRAINT "PK_d57f06b38805181019d75662aa6" PRIMARY KEY ("productId", "facetValueId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6a0558e650d75ae639ff38e413" ON "product_facet_values_facet_value" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06e7d73673ee630e8ec50d0b29" ON "product_facet_values_facet_value" ("facetValueId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_translation" ADD CONSTRAINT "FK_c7248226b95c17eb207e344b136" FOREIGN KEY ("langId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_translation" ADD CONSTRAINT "FK_11e0fcfa8861dc18ce8ad43d7f2" FOREIGN KEY ("facet_id") REFERENCES "facet"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_value" ADD CONSTRAINT "FK_d101dc2265a7341be3d94968c5b" FOREIGN KEY ("facetId") REFERENCES "facet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_value_translation" ADD CONSTRAINT "FK_7d59c312f7289cb347498d9e396" FOREIGN KEY ("langId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_value_translation" ADD CONSTRAINT "FK_5182b8d6cca21360c18d7158fbe" FOREIGN KEY ("facet_value_id") REFERENCES "facet_value"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_translation" ADD CONSTRAINT "FK_520fca64a80e0834a610ef6c73d" FOREIGN KEY ("product_option_id") REFERENCES "product_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_translation" ADD CONSTRAINT "FK_b4d0b0db25a05bce6e3a6b7fb94" FOREIGN KEY ("langId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option" ADD CONSTRAINT "FK_d76e92fdbbb5a2e6752ffd4a2c1" FOREIGN KEY ("group_id") REFERENCES "product_option_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_translation" ADD CONSTRAINT "FK_045befe4da0d3c207a981f4e88b" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_translation" ADD CONSTRAINT "FK_c26d31d2f592e8d42f14782fc81" FOREIGN KEY ("langId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_price" ADD CONSTRAINT "FK_65722daee34837f5a118d3b7a57" FOREIGN KEY ("tax_category_id") REFERENCES "tax_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_price" ADD CONSTRAINT "FK_247c16a2f0ac0ff6b3c18616cbb" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant" ADD CONSTRAINT "FK_ca67dd080aac5ecf99609960cd2" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group" ADD CONSTRAINT "FK_28f273fec3a8f15a46494a1e5cf" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group_translation" ADD CONSTRAINT "FK_6c0a4f559fe39b32b638adad5b1" FOREIGN KEY ("langId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group_translation" ADD CONSTRAINT "FK_81a815be3efd3c63a90742e27cc" FOREIGN KEY ("product_option_group_id") REFERENCES "product_option_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_translation" ADD CONSTRAINT "FK_7188391123575a3834038ecaf49" FOREIGN KEY ("langId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tax_rate" ADD CONSTRAINT "FK_6009a9188dabd8fd13a418e97f7" FOREIGN KEY ("tax_category_id") REFERENCES "tax_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_options_product_option" ADD CONSTRAINT "FK_526f0131260eec308a3bd2b61b6" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_options_product_option" ADD CONSTRAINT "FK_e96a71affe63c97f7fa2f076dac" FOREIGN KEY ("productOptionId") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_facet_values_facet_value" ADD CONSTRAINT "FK_69567bc225b6bbbd732d6c5455b" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_facet_values_facet_value" ADD CONSTRAINT "FK_0d641b761ed1dce4ef3cd33d559" FOREIGN KEY ("facetValueId") REFERENCES "facet_value"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_facet_values_facet_value" ADD CONSTRAINT "FK_6a0558e650d75ae639ff38e413a" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_facet_values_facet_value" ADD CONSTRAINT "FK_06e7d73673ee630e8ec50d0b29f" FOREIGN KEY ("facetValueId") REFERENCES "facet_value"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_facet_values_facet_value" DROP CONSTRAINT "FK_06e7d73673ee630e8ec50d0b29f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_facet_values_facet_value" DROP CONSTRAINT "FK_6a0558e650d75ae639ff38e413a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_facet_values_facet_value" DROP CONSTRAINT "FK_0d641b761ed1dce4ef3cd33d559"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_facet_values_facet_value" DROP CONSTRAINT "FK_69567bc225b6bbbd732d6c5455b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_options_product_option" DROP CONSTRAINT "FK_e96a71affe63c97f7fa2f076dac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_options_product_option" DROP CONSTRAINT "FK_526f0131260eec308a3bd2b61b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tax_rate" DROP CONSTRAINT "FK_6009a9188dabd8fd13a418e97f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_translation" DROP CONSTRAINT "FK_7188391123575a3834038ecaf49"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group_translation" DROP CONSTRAINT "FK_81a815be3efd3c63a90742e27cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group_translation" DROP CONSTRAINT "FK_6c0a4f559fe39b32b638adad5b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group" DROP CONSTRAINT "FK_28f273fec3a8f15a46494a1e5cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant" DROP CONSTRAINT "FK_ca67dd080aac5ecf99609960cd2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_price" DROP CONSTRAINT "FK_247c16a2f0ac0ff6b3c18616cbb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_price" DROP CONSTRAINT "FK_65722daee34837f5a118d3b7a57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_translation" DROP CONSTRAINT "FK_c26d31d2f592e8d42f14782fc81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_translation" DROP CONSTRAINT "FK_045befe4da0d3c207a981f4e88b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option" DROP CONSTRAINT "FK_d76e92fdbbb5a2e6752ffd4a2c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_translation" DROP CONSTRAINT "FK_b4d0b0db25a05bce6e3a6b7fb94"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_translation" DROP CONSTRAINT "FK_520fca64a80e0834a610ef6c73d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "forgot" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_value_translation" DROP CONSTRAINT "FK_5182b8d6cca21360c18d7158fbe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_value_translation" DROP CONSTRAINT "FK_7d59c312f7289cb347498d9e396"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_value" DROP CONSTRAINT "FK_d101dc2265a7341be3d94968c5b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_translation" DROP CONSTRAINT "FK_11e0fcfa8861dc18ce8ad43d7f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_translation" DROP CONSTRAINT "FK_c7248226b95c17eb207e344b136"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_06e7d73673ee630e8ec50d0b29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6a0558e650d75ae639ff38e413"`,
    );
    await queryRunner.query(`DROP TABLE "product_facet_values_facet_value"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0d641b761ed1dce4ef3cd33d55"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_69567bc225b6bbbd732d6c5455"`,
    );
    await queryRunner.query(
      `DROP TABLE "product_variant_facet_values_facet_value"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e96a71affe63c97f7fa2f076da"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_526f0131260eec308a3bd2b61b"`,
    );
    await queryRunner.query(
      `DROP TABLE "product_variant_options_product_option"`,
    );
    await queryRunner.query(`DROP TABLE "tax_rate"`);
    await queryRunner.query(`DROP TABLE "product_variant_translation"`);
    await queryRunner.query(`DROP TABLE "product_option_group_translation"`);
    await queryRunner.query(`DROP TABLE "product_option_group"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "product_variant"`);
    await queryRunner.query(`DROP TABLE "product_variant_price"`);
    await queryRunner.query(`DROP TABLE "tax_category"`);
    await queryRunner.query(`DROP TABLE "product_translation"`);
    await queryRunner.query(`DROP TABLE "product_option"`);
    await queryRunner.query(`DROP TABLE "product_option_translation"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df507d27b0fb20cd5f7bef9b9a"`,
    );
    await queryRunner.query(`DROP TABLE "forgot"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e282acb94d2e3aec10f480e4f6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "facet_value_translation"`);
    await queryRunner.query(`DROP TABLE "facet_value"`);
    await queryRunner.query(`DROP TABLE "facet"`);
    await queryRunner.query(`DROP TABLE "facet_translation"`);
    await queryRunner.query(`DROP TABLE "language"`);
  }
}
