import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Pessoa } from './Pessoa'

@Index('pessoa_entrega_pkey', ['id'], { unique: true })
@Entity('pessoa_entrega', { schema: 'public' })
export class PessoaEntrega {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('timestamp with time zone', { name: 'dt_cadastro' })
      dtCadastro: Date

  @Column('integer', {
      name: 'usuario_cadastro_id',
      nullable: true,
      default: () => '1',
  })
      usuarioCadastroId: number | null

  @Column('timestamp with time zone', { name: 'dt_alteracao', nullable: true })
      dtAlteracao: Date | null

  @Column('integer', { name: 'usuario_alteracao_id', nullable: true })
      usuarioAlteracaoId: number | null

  @Column('time without time zone', { name: 'dt_exclusao', nullable: true })
      dtExclusao: string | null

  @Column('integer', { name: 'usuario_exclusao_id', nullable: true })
      usuarioExclusaoId: number | null

  @Column('boolean', { name: 'flag_ativo', nullable: true })
      flagAtivo: boolean | null

  @Column('integer', { name: 'distancia', nullable: true })
      distancia: number | null

  @Column('integer', { name: 'quantidade_pacotes', nullable: true })
      quantidadePacotes: number | null

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.pessoaEntregas, {
      onDelete: 'CASCADE',
  })
  @JoinColumn([
      { name: 'pessoa_id', referencedColumnName: 'id' },
      { name: 'pessoa_id', referencedColumnName: 'id' },
  ])
      pessoa: Pessoa

}
