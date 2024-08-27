// Import necessary decorators and types from TypeORM
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
import Blog from './blog.entity'
import Project from './project.entity'
import { Experience } from './experience.entity'
import { Follow } from './follow.entity'
import SocialLink from './social_link.entity'
import Skill from './skill.entity'
import { Role } from '~/enum/role'
import Comment from './comment.entity'
@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  userName: string

  @Column({ unique: true })
  email: string

  @Column()
  emailVerified: boolean

  @Column()
  fullName: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.GUEST
  })
  role: Role

  @Column({ nullable: true })
  title: string

  @Column('text', { nullable: true })
  description: string

  @Column({ nullable: true })
  imageUrl: string

  @Column({ nullable: true })
  occupation: string

  @Column('text', { nullable: true })
  hobbies: string

  @Column('text', { nullable: true })
  quote: string

  @Column({ default: false })
  isPublic: boolean

  @CreateDateColumn()
  createdAt: Date

  formattedDate(date: Date) {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  formattedCreatedAt() {
    return this.formattedDate(this.createdAt)
  }

  formattedUpdatedAt() {
    return this.formattedDate(this.updatedAt)
  }

  @UpdateDateColumn()
  updatedAt: Date

  // Define relationships
  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[]

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[]

  @OneToMany(() => Experience, (experience) => experience.user)
  experiences: Experience[]

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    name: 'follow',
    joinColumn: { name: 'followerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followingId', referencedColumnName: 'id' }
  })
  followers: User[]

  @ManyToMany(() => User, (user) => user.followers)
  following: User[]

  @OneToMany(() => Skill, (skill) => skill.user)
  skills: Skill[]

  @OneToMany(() => SocialLink, (socialLink) => socialLink.user)
  socialLinks: SocialLink[]

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]
  constructor(data?: Partial<User>) {
    super()
    if (data) {
      Object.assign(this, data)
    }
  }

  @Column({ default: true })
  isActive: boolean
}
