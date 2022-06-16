import {MigrationInterface, QueryRunner} from "typeorm";

export class v31655289121149 implements MigrationInterface {
    name = 'v31655289121149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "enabled" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "enabled"`);
    }

}
