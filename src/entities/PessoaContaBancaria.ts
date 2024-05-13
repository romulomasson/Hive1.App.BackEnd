import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('pessoa_conta_bancaria_pkey', ['id'], { unique: true })
@Entity('pessoa_conta_bancaria', { schema: 'public' })
export class PessoaContaBancaria {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('integer', { name: 'pessoa_id' })
      pessoaId: number

  @Column('integer', { name: 'banco_id' })
      bancoId: number

  @Column('character varying', { name: 'nro_agencia', length: 100 })
      nroAgencia: string

  @Column('character varying', {
      name: 'digito_agencia',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      digitoAgencia: string | null

  @Column('character varying', { name: 'nro_conta', length: 100 })
      nroConta: string

  @Column('character varying', {
      name: 'digito_conta',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      digitoConta: string | null

  @Column('character varying', {
      name: 'operacao_conta',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      operacaoConta: string | null

  @Column('character varying', {
      name: 'pix',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      pix: string | null

  @Column('character varying', { name: 'documento_titular', length: 100 })
      documentoTitular: string

  @Column('character varying', { name: 'nome_titular', length: 100 })
      nomeTitular: string

  @Column('character varying', { name: 'razao_social_titular', length: 100 })
      razaoSocialTitular: string

  @Column('character varying', { name: 'tipo_conta', length: 100 })
      tipoConta: string

  @Column('character varying', {
      name: 'descricao',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      descricao: string | null

  @Column('boolean', { name: 'ativo', nullable: true })
      ativo: boolean | null

  @Column('character varying', {
      name: 'flag_principal',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      flagPrincipal: string | null

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
