import { MigrationInterface, QueryRunner } from 'typeorm';

export class v21654864143175 implements MigrationInterface {
  name = 'v21654864143175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "facet_value" DROP CONSTRAINT "FK_d101dc2265a7341be3d94968c5b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_value" RENAME COLUMN "facetId" TO "facet_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_value" ADD CONSTRAINT "FK_e2dddd0664d5a02c700e77bd32e" FOREIGN KEY ("facet_id") REFERENCES "facet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "facet_value" DROP CONSTRAINT "FK_e2dddd0664d5a02c700e77bd32e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_value" RENAME COLUMN "facet_id" TO "facetId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facet_value" ADD CONSTRAINT "FK_d101dc2265a7341be3d94968c5b" FOREIGN KEY ("facetId") REFERENCES "facet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
