import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('tipo_contato_pkey', ['id'], { unique: true })
@Entity('tipo_contato', { schema: 'public' })
export class TipoContato {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('character varying', { name: 'descricao', length: 100 })
      descricao: string

  @Column('boolean', { name: 'ativo', nullable: true })
      ativo: boolean | null

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
