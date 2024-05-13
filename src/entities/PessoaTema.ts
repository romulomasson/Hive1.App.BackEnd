import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('pesssoa_tema_pkey', ['id'], { unique: true })
@Entity('pessoa_tema', { schema: 'public' })
export class PessoaTema {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('uuid', { name: 'uuid', default: () => 'uuid_generate_v4()' })
      uuid: string

  @Column('integer', { name: 'pessoa_id' })
      pessoaId: number

  @Column('integer', { name: 'tema_id' })
      temaId: number

}
