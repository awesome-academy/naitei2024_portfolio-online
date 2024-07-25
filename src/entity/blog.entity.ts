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
export default class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  title: string

  @Column('text')
  description: string

  @Column({ nullable: true })
  imageUrl: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.blogs)
  @JoinColumn({ name: 'userId' })
  user: User

  constructor(data?: Partial<Blog>) {
    super()
    if (data) {
      Object.assign(this, data)
    }
  }
}
