import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1583686666229 implements MigrationInterface {
    name = 'migration1583686666229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // WHY DID IT WORK THIS TIME??!!??!?!!?!??!?!?
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "players" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying(255) NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_ba3575d2fbe71fab7155366235" UNIQUE ("user_id"), CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_ba3575d2fbe71fab7155366235e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_ba3575d2fbe71fab7155366235e"`, undefined);
        await queryRunner.query(`DROP TABLE "players"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
