import { Column, Entity, Index } from 'typeorm'

@Index('tipo_rede_social_pkey', ['id'], { unique: true })
@Entity('tipo_rede_social', { schema: 'public' })
export class TipoRedeSocial {

  @Column('integer', { primary: true, name: 'id' })
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

}
