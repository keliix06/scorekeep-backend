import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeamTable1687973677068 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table teams(id uuid DEFAULT gen_random_uuid () constraint teams_pk primary key,user_id varchar,name varchar)`,
    );

    await queryRunner.query(
      `create index teams_user_id_index on teams (user_id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "teams"`);
  }
}
