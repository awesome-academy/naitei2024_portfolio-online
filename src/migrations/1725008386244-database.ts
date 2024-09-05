import { MigrationInterface, QueryRunner } from "typeorm";

export class Database1725008386244 implements MigrationInterface {
    name = 'Database1725008386244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`blogId\` int NOT NULL, \`content\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`blog\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`content\` text NOT NULL, \`imageUrl\` varchar(255) NULL, \`additionalImages\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`overview\` text NOT NULL, \`whatYouLearn\` text NULL, \`keyFeatures\` text NULL, \`linkGithub\` varchar(255) NULL, \`imageUrl\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`experience\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`company\` text NOT NULL, \`location\` varchar(255) NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NULL, \`description\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`social_link\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skill\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`yearsOfExperience\` int NOT NULL, \`isHighlighted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`emailVerified\` tinyint NOT NULL, \`fullName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('admin', 'user', 'guest') NOT NULL DEFAULT 'guest', \`title\` varchar(255) NULL, \`description\` text NULL, \`imageUrl\` varchar(255) NULL, \`occupation\` varchar(255) NULL, \`hobbies\` text NULL, \`quote\` text NULL, \`isPublic\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isActive\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_da5934070b5f2726ebfd3122c8\` (\`userName\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pending_verification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`digitVerification\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_c7f6f11ee662e6674c48c1d8ca\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skill_define\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`follow\` (\`followerId\` int NOT NULL, \`followingId\` int NOT NULL, \`isAccepted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`followerId\`, \`followingId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP COLUMN \`isAccepted\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD \`isAccepted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`CREATE INDEX \`IDX_550dce89df9570f251b6af2665\` ON \`follow\` (\`followerId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_e9f68503556c5d72a161ce3851\` ON \`follow\` (\`followingId\`)`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_5dec255234c5b7418f3d1e88ce4\` FOREIGN KEY (\`blogId\`) REFERENCES \`blog\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`blog\` ADD CONSTRAINT \`FK_fc46ede0f7ab797b7ffacb5c08d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_7c4b0d3b77eaf26f8b4da879e63\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD CONSTRAINT \`FK_cbfb1d1219454c9b45f1b3c4274\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`social_link\` ADD CONSTRAINT \`FK_d8a1d8b8a8235632f9011346197\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skill\` ADD CONSTRAINT \`FK_c08612011a88745a32784544b28\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_550dce89df9570f251b6af2665a\` FOREIGN KEY (\`followerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_e9f68503556c5d72a161ce38513\` FOREIGN KEY (\`followingId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_e9f68503556c5d72a161ce38513\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_550dce89df9570f251b6af2665a\``);
        await queryRunner.query(`ALTER TABLE \`skill\` DROP FOREIGN KEY \`FK_c08612011a88745a32784544b28\``);
        await queryRunner.query(`ALTER TABLE \`social_link\` DROP FOREIGN KEY \`FK_d8a1d8b8a8235632f9011346197\``);
        await queryRunner.query(`ALTER TABLE \`experience\` DROP FOREIGN KEY \`FK_cbfb1d1219454c9b45f1b3c4274\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_7c4b0d3b77eaf26f8b4da879e63\``);
        await queryRunner.query(`ALTER TABLE \`blog\` DROP FOREIGN KEY \`FK_fc46ede0f7ab797b7ffacb5c08d\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_5dec255234c5b7418f3d1e88ce4\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`DROP INDEX \`IDX_e9f68503556c5d72a161ce3851\` ON \`follow\``);
        await queryRunner.query(`DROP INDEX \`IDX_550dce89df9570f251b6af2665\` ON \`follow\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP COLUMN \`isAccepted\``);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD \`isAccepted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`DROP TABLE \`follow\``);
        await queryRunner.query(`DROP TABLE \`skill_define\``);
        await queryRunner.query(`DROP INDEX \`IDX_c7f6f11ee662e6674c48c1d8ca\` ON \`pending_verification\``);
        await queryRunner.query(`DROP TABLE \`pending_verification\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_da5934070b5f2726ebfd3122c8\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`skill\``);
        await queryRunner.query(`DROP TABLE \`social_link\``);
        await queryRunner.query(`DROP TABLE \`experience\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`blog\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
    }

}
