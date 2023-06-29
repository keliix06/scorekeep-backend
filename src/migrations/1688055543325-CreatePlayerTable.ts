import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePlayerTable1688055543325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table player(id uuid DEFAULT gen_random_uuid () constraint players_pk primary key,teamId uuid,name varchar,number smallint)`,
    );

    await queryRunner.query(
      `alter table player add constraint players_teams_id_fk foreign key (teamId) references team`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "player"`);
  }
}
