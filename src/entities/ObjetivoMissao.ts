import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Objetivo } from './Objetivo'
import { PessoaObjetivoMissao } from './PessoaObjetivoMissao'

@Index('pk', ['id'], { unique: true })
@Entity('objetivo_missao', { schema: 'public' })
export class ObjetivoMissao {

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

  @Column('enum', { name: 'tipo', enum: ['Primario', 'Recorrente'] })
      tipo: 'Primario' | 'Recorrente'

  @Column('enum', {
      name: 'recorrencia',
      enum: ['uma vez', 'diario', 'semanal', 'mensal', 'anual'],
  })
      recorrencia: 'uma vez' | 'diario' | 'semanal' | 'mensal' | 'anual'

  @Column('character varying', {
      name: 'descricao',
      nullable: true,
      length: 255,
  })
      descricao: string | null

  @Column('integer', { name: 'pontos', nullable: true })
      pontos: number | null

  @Column('boolean', { name: 'flag_ativo', nullable: true })
      flagAtivo: boolean | null

  @Column('character varying', { name: 'slug', nullable: true, length: 50 })
      slug: string | null

  @ManyToOne(() => Objetivo, (objetivo) => objetivo.objetivoMissaos)
  @JoinColumn([{ name: 'objetivo_id', referencedColumnName: 'id' }])
      objetivo: Objetivo

  @OneToMany(
      () => PessoaObjetivoMissao,
      (pessoaObjetivoMissao) => pessoaObjetivoMissao.missao
  )
      pessoaObjetivoMissaos: PessoaObjetivoMissao[]

}
