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
export default class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  name: string

  @Column('text')
  overview: string

  @Column('text', { nullable: true })
  whatYouLearn: string

  @Column('text', { nullable: true })
  keyFeatures: string

  @Column({ nullable: true })
  linkGithub: string

  @Column({ nullable: true })
  imageUrl: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'userId' })
  user: User

  constructor(data?: Partial<Project>) {
    super()
    if (data) {
      Object.assign(this, data)
    }
  }
}
