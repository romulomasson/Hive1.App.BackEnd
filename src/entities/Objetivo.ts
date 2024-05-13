import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ObjetivoMissao } from './ObjetivoMissao'
import { PessoaObjetivoMissao } from './PessoaObjetivoMissao'

@Index('pkey', ['id'], { unique: true })
@Entity('objetivo', { schema: 'public' })
export class Objetivo {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('character varying', { name: 'titulo', length: 100 })
      titulo: string

  @Column('enum', { name: 'tipo', enum: ['Principal', 'Gerais'] })
      tipo: 'Principal' | 'Gerais'

  @Column('enum', { name: 'periodo', enum: ['Unico', 'Semanal'] })
      periodo: 'Unico' | 'Semanal'

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

  @Column('timestamp with time zone', { name: 'dt_exclusao', nullable: true })
      dtExclusao: Date | null

  @Column('integer', { name: 'usuario_exclusao_id', nullable: true })
      usuarioExclusaoId: number | null

  @Column('boolean', { name: 'flag_ativo', nullable: true })
      flagAtivo: boolean | null

  @Column('boolean', { name: 'fixo', nullable: true, default: () => 'false' })
      fixo: boolean | null

  @Column('character varying', { name: 'slug', nullable: true, length: 50 })
      slug: string | null

  @OneToMany(() => ObjetivoMissao, (objetivoMissao) => objetivoMissao.objetivo)
      objetivoMissaos: ObjetivoMissao[]

  @OneToMany(
      () => PessoaObjetivoMissao,
      (pessoaObjetivoMissao) => pessoaObjetivoMissao.objetivo
  )
      pessoaObjetivoMissaos: PessoaObjetivoMissao[]

}
