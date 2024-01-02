import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveUserId1704191012647 implements MigrationInterface {
  name = 'RemoveUserId1704191012647'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "usuario_id"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" ADD "usuario_id" character varying(100)`)
  }
}
