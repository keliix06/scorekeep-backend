import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeamTable1687973677068 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table team(id uuid DEFAULT gen_random_uuid () constraint teams_pk primary key,userId uuid,name varchar)`,
    );

    await queryRunner.query(
      `alter table team add constraint teams_users_id_fk foreign key (userId) references user`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "team"`);
  }
}
