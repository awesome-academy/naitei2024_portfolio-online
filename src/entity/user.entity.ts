import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
  ManyToMany,
  JoinTable,
  UpdateDateColumn
} from 'typeorm'
import { Experience } from './experience.entity'
import Skill from './skill.entity'
import SocialLink from './socialLink.entity'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn() // Tự động tạo khóa chính
  id: number

  @Column({ unique: true }) // Cột username, phải là duy nhất
  username: string

  @Column({ unique: true }) // Cột email, phải là duy nhất
  email: string

  @Column() // Cột fullname
  fullname: string

  @Column() // Cột password
  password: string

  @Column({
    type: 'enum',
    enum: ['guest', 'user', 'admin'],
    default: 'guest'
  }) // Cột role, kiểu enum với giá trị mặc định là 'guest'
  role: string

  @Column({ nullable: true }) // Cột title, có thể null
  title: string

  @Column('text', { nullable: true }) // Cột description, kiểu text và có thể null
  description: string

  @Column({ nullable: true }) // Cột imageUrl, có thể null
  imageUrl: string

  @Column({ nullable: true }) // Cột occupation, có thể null
  occupation: string

  @Column('text', { nullable: true }) // Cột hobbies, kiểu text và có thể null
  hobbies: string

  @Column('text', { nullable: true }) // Cột quote, kiểu text và có thể null
  quote: string

  @Column({ default: false }) // Cột isPublic, mặc định là false
  isPublic: boolean

  @CreateDateColumn() // Cột createdAt, tự động tạo ngày giờ tạo
  createdAt: Date

  @UpdateDateColumn() // Cột updated_at, tự động cập nhật ngày giờ cập nhật
  updated_at: Date

  @OneToMany(() => Experience, (experience) => experience.user) // Một user có nhiều experience
  experiences: Experience[]

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    name: 'follow',
    joinColumn: { name: 'followerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followingId', referencedColumnName: 'id' }
  }) // Nhiều user có thể follow nhau
  followers: User[]

  @ManyToMany(() => User, (user) => user.followers)
  following: User[]

  @OneToMany(() => Skill, (skill) => skill.user) // Một user có nhiều skill
  skills: Skill[]

  @OneToMany(() => SocialLink, (socialLink) => socialLink.user) // Một user có nhiều social link
  socialLinks: SocialLink[]

  constructor(data?: Partial<User>) {
    super()
    if (data) {
      Object.assign(this, data) // Gán dữ liệu cho các thuộc tính
    }
  }
}
