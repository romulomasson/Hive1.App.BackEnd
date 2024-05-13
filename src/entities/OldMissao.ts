import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('missao_pkey', ['id'], { unique: true })
@Entity('old_missao', { schema: 'public' })
export class OldMissao {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('integer', { name: 'pai_id', nullable: true })
      paiId: number | null

  @Column('character varying', { name: 'titulo', nullable: true, length: 255 })
      titulo: string | null

  @Column('character varying', {
      name: 'descricao',
      nullable: true,
      length: 3000,
  })
      descricao: string | null

  @Column('integer', { name: 'pontos', nullable: true })
      pontos: number | null

  @Column('timestamp with time zone', { name: 'dt_fim', nullable: true })
      dtFim: Date | null

  @Column('timestamp with time zone', { name: 'dt_inicio', nullable: true })
      dtInicio: Date | null

  @Column('character varying', {
      name: 'motivo_exclusao',
      nullable: true,
      length: 255,
  })
      motivoExclusao: string | null

  @Column('boolean', { name: 'ativo' })
      ativo: boolean

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

  @Column('character varying', { name: 'tipo', nullable: true, length: 25 })
      tipo: string | null

  @Column('character varying', {
      name: 'recorrencia',
      nullable: true,
      length: 25,
  })
      recorrencia: string | null

}
