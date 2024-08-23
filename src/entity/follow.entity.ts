import { Entity, Column, CreateDateColumn, BaseEntity, PrimaryColumn, ManyToOne } from 'typeorm'
import User from './user.entity'

@Entity()
export class Follow extends BaseEntity {
  @Column()
  @PrimaryColumn()
  followerId: number

  @Column()
  @PrimaryColumn()
  followingId: number

  @Column({ default: false })
  isAccepted: boolean

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => User, (user) => user.following)
  follower: User

  @ManyToOne(() => User, (user) => user.followers)
  following: User

  constructor(data?: Partial<Follow>) {
    super()
    if (data) {
      Object.assign(this, data)
    }
  }
}
