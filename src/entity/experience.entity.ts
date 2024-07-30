import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn
} from 'typeorm'
import User from './user.entity'

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  title: string

  @Column('text')
  company: string

  @Column()
  location: string

  @Column()
  startDate: Date

  @Column({ nullable: true })
  endDate: Date

  @Column('text', { nullable: true })
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.experiences)
  @JoinColumn({ name: 'userId' })
  user: User

  constructor(data?: Partial<Experience>) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
