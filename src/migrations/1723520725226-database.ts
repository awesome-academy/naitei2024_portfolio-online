import { MigrationInterface, QueryRunner } from "typeorm";

export class Database1723520725226 implements MigrationInterface {
    name = 'Database1723520725226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_550dce89df9570f251b6af2665a\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_e9f68503556c5d72a161ce38513\``);
        await queryRunner.query(`DROP INDEX \`IDX_550dce89df9570f251b6af2665\` ON \`follow\``);
        await queryRunner.query(`DROP INDEX \`IDX_e9f68503556c5d72a161ce3851\` ON \`follow\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP COLUMN \`createdAt\``);
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
        await queryRunner.query(`ALTER TABLE \`follow\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`CREATE INDEX \`IDX_e9f68503556c5d72a161ce3851\` ON \`follow\` (\`followingId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_550dce89df9570f251b6af2665\` ON \`follow\` (\`followerId\`)`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_e9f68503556c5d72a161ce38513\` FOREIGN KEY (\`followingId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_550dce89df9570f251b6af2665a\` FOREIGN KEY (\`followerId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
