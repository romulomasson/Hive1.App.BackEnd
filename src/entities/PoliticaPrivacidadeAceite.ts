import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('politica_privacidade_aceite_pkey', ['id'], { unique: true })
@Entity('politica_privacidade_aceite', { schema: 'public' })
export class PoliticaPrivacidadeAceite {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('integer', { name: 'politica_privacidade_id', nullable: true })
      politicaPrivacidadeId: number | null

  @Column('integer', { name: 'pessoa_id' })
      pessoaId: number

  @Column('uuid', { name: 'uuid', default: () => 'uuid_generate_v4()' })
      uuid: string

  @Column('character varying', {
      name: 'manufacturer',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      manufacturer: string | null

  @Column('character varying', {
      name: 'model',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      model: string | null

  @Column('integer', { name: 'usuario_cadastro_id', nullable: true })
      usuarioCadastroId: number | null

  @Column('timestamp with time zone', { name: 'dt_cadastro' })
      dtCadastro: Date

  @Column('integer', { name: 'usuario_alteracao_id', nullable: true })
      usuarioAlteracaoId: number | null

  @Column('timestamp with time zone', { name: 'dt_alteracao', nullable: true })
      dtAlteracao: Date | null

  @Column('integer', { name: 'usuario_exclusao_id', nullable: true })
      usuarioExclusaoId: number | null

  @Column('timestamp with time zone', { name: 'dt_exclusao', nullable: true })
      dtExclusao: Date | null

  @Column('character varying', {
      name: 'motivo_exclusao',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      motivoExclusao: string | null

}
