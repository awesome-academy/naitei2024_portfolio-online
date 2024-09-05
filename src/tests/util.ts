import { BaseEntity, EntityTarget } from 'typeorm'
import { AppDataSource } from '~/config/data-source'

export function clearDatabase(entity: EntityTarget<any>) {
  const queryRunner = AppDataSource.createQueryRunner()
  const repository = AppDataSource.getRepository(entity)
  return queryRunner
    .connect()
    .then(() => queryRunner.startTransaction())
    .then(() => queryRunner.query('SET FOREIGN_KEY_CHECKS = 0'))
    .then(() => queryRunner.query(`TRUNCATE TABLE ${repository.metadata.tableName}`))
    .then(() => queryRunner.query('SET FOREIGN_KEY_CHECKS = 1'))
    .then(() => queryRunner.commitTransaction())
    .then(() => queryRunner.release())
    .catch(() => queryRunner.rollbackTransaction())
}
