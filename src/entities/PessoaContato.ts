import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('pessoa_contato_pkey', ['id'], { unique: true })
@Entity('pessoa_contato', { schema: 'public' })
export class PessoaContato {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('integer', { name: 'pessoa_id' })
      pessoaId: number

  @Column('integer', { name: 'tipo_contato_id', nullable: true })
      tipoContatoId: number | null

  @Column('character varying', {
      name: 'nome',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      nome: string | null

  @Column('character varying', {
      name: 'email',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      email: string | null

  @Column('character varying', {
      name: 'tel_comercial',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      telComercial: string | null

  @Column('character varying', {
      name: 'tel_celular',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      telCelular: string | null

  @Column('character varying', {
      name: 'nextel',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      nextel: string | null

  @Column('character varying', {
      name: 'observacao',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      observacao: string | null

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
