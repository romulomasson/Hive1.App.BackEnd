import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('pessoa_pontos_pkey', ['id'], { unique: true })
@Entity('pessoa_ponto', { schema: 'public' })
export class PessoaPonto {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('uuid', { name: 'uuid', default: () => 'uuid_generate_v4()' })
      uuid: string

  @Column('integer', { name: 'pessoa_id' })
      pessoaId: number

  @Column('integer', { name: 'pontos', default: () => '0' })
      pontos: number

  @Column('timestamp with time zone', { name: 'dt_alteracao' })
      dtAlteracao: Date

  @Column('timestamp with time zone', { name: 'dt_cadastro' })
      dtCadastro: Date

}
