import { MigrationInterface, QueryRunner } from "typeorm";

export class Database1722325614562 implements MigrationInterface {
    name = 'Database1722325614562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_550dce89df9570f251b6af2665a\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_e9f68503556c5d72a161ce38513\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_550dce89df9570f251b6af2665\` ON \`follow\``);
        await queryRunner.query(`DROP INDEX \`IDX_e9f68503556c5d72a161ce3851\` ON \`follow\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`fullname\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_da5934070b5f2726ebfd3122c8\` (\`userName\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`fullName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`CREATE INDEX \`IDX_550dce89df9570f251b6af2665\` ON \`follow\` (\`followerId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_e9f68503556c5d72a161ce3851\` ON \`follow\` (\`followingId\`)`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_550dce89df9570f251b6af2665a\` FOREIGN KEY (\`followerId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_e9f68503556c5d72a161ce38513\` FOREIGN KEY (\`followingId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_e9f68503556c5d72a161ce38513\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_550dce89df9570f251b6af2665a\``);
        await queryRunner.query(`DROP INDEX \`IDX_e9f68503556c5d72a161ce3851\` ON \`follow\``);
        await queryRunner.query(`DROP INDEX \`IDX_550dce89df9570f251b6af2665\` ON \`follow\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`fullName\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_da5934070b5f2726ebfd3122c8\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userName\``);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`fullname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_e9f68503556c5d72a161ce3851\` ON \`follow\` (\`followingId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_550dce89df9570f251b6af2665\` ON \`follow\` (\`followerId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\` (\`username\`)`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_e9f68503556c5d72a161ce38513\` FOREIGN KEY (\`followingId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_550dce89df9570f251b6af2665a\` FOREIGN KEY (\`followerId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
