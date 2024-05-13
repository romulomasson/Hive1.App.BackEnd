import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ObjetivoMissao } from './ObjetivoMissao'
import { Pessoa } from './Pessoa'
import { Objetivo } from './Objetivo'
import { PessoaObjetivoMissaoLogica } from './PessoaObjetivoMissaoLogica'

@Index('pessoa_missao_pkey', ['id'], { unique: true })
@Entity('pessoa_objetivo_missao', { schema: 'public' })
export class PessoaObjetivoMissao {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('timestamp with time zone', { name: 'dt_inicio', nullable: true })
      dtInicio: Date | null

  @Column('timestamp with time zone', { name: 'dt_conclusao', nullable: true })
      dtConclusao: Date | null

  @Column('integer', { name: 'usuario_exclusao_id', nullable: true })
      usuarioExclusaoId: number | null

  @Column('boolean', { name: 'ativo', nullable: true, default: () => 'true' })
      ativo: boolean | null

  @Column('timestamp with time zone', { name: 'dt_cadastro', nullable: true })
      dtCadastro: Date | null

  @Column('integer', { name: 'usuario_cadastro_id', nullable: true })
      usuarioCadastroId: number | null

  @Column('timestamp with time zone', { name: 'dt_alteracao', nullable: true })
      dtAlteracao: Date | null

  @Column('integer', { name: 'usuario_alteracao_id', nullable: true })
      usuarioAlteracaoId: number | null

  @Column('timestamp with time zone', { name: 'dt_exclusao', nullable: true })
      dtExclusao: Date | null

  @ManyToOne(
      () => ObjetivoMissao,
      (objetivoMissao) => objetivoMissao.pessoaObjetivoMissaos
  )
  @JoinColumn([{ name: 'missao_id', referencedColumnName: 'id' }])
      missao: ObjetivoMissao

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.pessoaObjetivoMissaos, {
      onDelete: 'CASCADE',
  })
  @JoinColumn([
      { name: 'pessoa_id', referencedColumnName: 'id' },
      { name: 'pessoa_id', referencedColumnName: 'id' },
  ])
      pessoa: Pessoa

  @ManyToOne(() => Objetivo, (objetivo) => objetivo.pessoaObjetivoMissaos)
  @JoinColumn([{ name: 'objetivo_id', referencedColumnName: 'id' }])
      objetivo: Objetivo

  @OneToMany(
      () => PessoaObjetivoMissaoLogica,
      (pessoaObjetivoMissaoLogica) => pessoaObjetivoMissaoLogica.pessoaObjetivoMissao
  )
      pessoaObjetivoMissaoLogicas: PessoaObjetivoMissaoLogica[]

}
