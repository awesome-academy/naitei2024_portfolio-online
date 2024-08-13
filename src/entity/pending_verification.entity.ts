import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class PendingVerification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  digitVerification: string

  constructor(data?: Partial<PendingVerification>) {
    super()
    if (data) {
      Object.assign(this, data)
    }
  }
}
