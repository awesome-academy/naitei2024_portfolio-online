import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  UpdateDateColumn
} from 'typeorm'
import User from './user.entity'

@Entity()
export default class Skill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  name: string

  @Column({ nullable: true })
  proficiency: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.skills)
  @JoinColumn({ name: 'userId' })
  user: User

  constructor(data?: Partial<Skill>) {
    super()
    if (data) {
      Object.assign(this, data)
    }
  }
}
