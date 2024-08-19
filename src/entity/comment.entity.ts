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
import Blog from './blog.entity'

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  blogId: number

  @Column('text')
  content: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: User

  @ManyToOne(() => Blog, (blog) => blog.comments)
  @JoinColumn({ name: 'blogId' })
  blog: Blog

  constructor(data?: Partial<Comment>) {
    super()
    if (data) {
      Object.assign(this, data)
    }
  }
}
