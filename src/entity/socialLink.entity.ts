import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm'
import User from './user.entity'

@Entity()
export default class SocialLink extends BaseEntity {
  @PrimaryGeneratedColumn() // Tự động tạo khóa chính
  id: number

  @Column() // Cột url
  url: string

  @ManyToOne(() => User, (user) => user.socialLinks) // Nhiều social link thuộc về một user
  @JoinColumn({ name: 'userId' }) // Tham chiếu đến cột userId
  user: User

  constructor(data?: Partial<SocialLink>) {
    super()
    if (data) {
      Object.assign(this, data) // Gán dữ liệu cho các thuộc tính
    }
  }
}
