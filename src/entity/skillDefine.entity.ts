import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export default class SkillDefine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
