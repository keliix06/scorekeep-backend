import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1687756412659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table users(id uuid constraint users_pk primary key,first_name varchar,last_name varchar,username varchar,password varchar,email varchar)`,
    );

    await queryRunner.query(
      `create unique index users_email_uindex on users (email)`,
    );

    await queryRunner.query(
      `create index users_username_index on users (username)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
