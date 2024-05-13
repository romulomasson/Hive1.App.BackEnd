import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('sistema_meta_pkey', ['id'], { unique: true })
@Index('unique_key_name', ['key'], { unique: true })
@Entity('sistema_meta', { schema: 'public' })
export class SistemaMeta {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('character varying', { name: 'key', unique: true })
      key: string

  @Column('json', { name: 'value', nullable: true })
      value: object | null

}
