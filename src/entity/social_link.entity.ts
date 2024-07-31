import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm'
import User from './user.entity'

@Entity()
export default class SocialLink extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  url: string

  @ManyToOne(() => User, (user) => user.socialLinks)
  @JoinColumn({ name: 'userId' })
  user: User

  constructor(data?: Partial<SocialLink>) {
    super()
    if (data) {
      Object.assign(this, data)
    }
  }
}
