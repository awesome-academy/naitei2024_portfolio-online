import { DataSource } from 'typeorm'
import { join } from 'path'
import dotenv from 'dotenv'
dotenv.config()

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env
const PORT = MYSQL_PORT ? parseInt(MYSQL_PORT) : 3306

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: MYSQL_HOST,
  port: PORT,
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  logging: false,
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  entities: [join(__dirname, '../entity/*.entity.{ts,js}')],
  synchronize: false
})
