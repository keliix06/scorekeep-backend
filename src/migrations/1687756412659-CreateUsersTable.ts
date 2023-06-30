import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1687756412659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table user(id uuid DEFAULT gen_random_uuid () constraint users_pk primary key,firstname varchar,lastname varchar,username varchar,password varchar,email varchar)`,
    );

    await queryRunner.query(
      `create unique index users_email_uindex on user (email)`,
    );

    await queryRunner.query(
      `create unique index users_username_uindex on user (username)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
