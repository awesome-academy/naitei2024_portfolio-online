import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn as UpdatedDateColumn, BaseEntity } from 'typeorm'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  fullname: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: ['guest', 'user', 'admin'],
    default: 'guest'
  })
  role: string

  @Column({ nullable: true })
  title: string

  @Column({ nullable: true })
  phoneNumber: string

  @Column('text', { nullable: true })
  description: string

  @Column({ nullable: true })
  image_url: string

  @Column({ nullable: true })
  occupation: string

  @Column('text', { nullable: true })
  hobbies: string

  @Column('text', { nullable: true })
  quote: string

  @Column({ default: false })
  is_public: boolean

  @UpdatedDateColumn()
  created_at: Date

  @UpdatedDateColumn()
  updated_at: Date

  // Define relationships
  constructor(data?: Partial<User>) {
    super()
    if (data) {
      Object.assign(this, data)
    }
  }
}
