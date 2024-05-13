import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { PessoaObjetivoMissao } from './PessoaObjetivoMissao'

@Index('pessoa_objetivo_missao_logica_pkey', ['id'], { unique: true })
@Entity('pessoa_objetivo_missao_logica', { schema: 'logica' })
export class PessoaObjetivoMissaoLogica {

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

  @Column('integer', { name: 'logica_id' })
      logicaId: number

  @Column('enum', {
      name: 'entidade',
      enum: ['indique_semanal', 'login_semanal', 'compartilhe_semanal'],
  })
      entidade: 'indique_semanal' | 'login_semanal' | 'compartilhe_semanal'

  @ManyToOne(
      () => PessoaObjetivoMissao,
      (pessoaObjetivoMissao) => pessoaObjetivoMissao.pessoaObjetivoMissaoLogicas
  )
  @JoinColumn([
      { name: 'pessoa_objetivo_missao_id', referencedColumnName: 'id' },
  ])
      pessoaObjetivoMissao: PessoaObjetivoMissao

}
