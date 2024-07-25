import { Entity, Column, CreateDateColumn, BaseEntity, PrimaryColumn } from 'typeorm'

@Entity()
export class Follow extends BaseEntity {
  @Column()
  @PrimaryColumn()
  followerId: number

  @Column()
  @PrimaryColumn()
  followingId: number

  @CreateDateColumn()
  createdAt: Date

  constructor(data?: Partial<Follow>) {
    super()
    if (data) {
      Object.assign(this, data)
    }
  }
}
