import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('pessoa_historico_pkey', ['id'], { unique: true })
@Entity('pessoa_historico', { schema: 'public' })
export class PessoaHistorico {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('integer', { name: 'pessoa_id' })
      pessoaId: number

  @Column('integer', { name: 'tipo_historico_id', nullable: true })
      tipoHistoricoId: number | null

  @Column('timestamp with time zone', { name: 'data' })
      data: Date

  @Column('character varying', {
      name: 'observacao',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      observacao: string | null

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
