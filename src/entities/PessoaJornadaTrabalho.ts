import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('pessoa_jornada_trabalho_pkey', ['id'], { unique: true })
@Entity('pessoa_jornada_trabalho', { schema: 'public' })
export class PessoaJornadaTrabalho {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('uuid', { name: 'uuid', default: () => 'uuid_generate_v4()' })
      uuid: string

  @Column('integer', { name: 'pessoa_id' })
      pessoaId: number

  @Column('character varying', { name: 'dia_semana', length: 100 })
      diaSemana: string

  @Column('character varying', { name: 'periodo', length: 100 })
      periodo: string

  @Column('character varying', {
      name: 'observacoes',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      observacoes: string | null

  @Column('timestamp with time zone', { name: 'dt_cadastro' })
      dtCadastro: Date

  @Column('integer', { name: 'usuario_cadastro_id', nullable: true })
      usuarioCadastroId: number | null

  @Column('timestamp with time zone', { name: 'dt_alteracao', nullable: true })
      dtAlteracao: Date | null

  @Column('integer', { name: 'usuario_alteracao_id', nullable: true })
      usuarioAlteracaoId: number | null

  @Column('timestamp with time zone', { name: 'dt_exclusao', nullable: true })
      dtExclusao: Date | null

  @Column('integer', { name: 'usuario_exclusao_id', nullable: true })
      usuarioExclusaoId: number | null

  @Column('character varying', {
      name: 'motivo_exclusao',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      motivoExclusao: string | null

}
