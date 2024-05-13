import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('banco_pkey', ['id'], { unique: true })
@Entity('banco', { schema: 'public' })
export class Banco {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('character varying', { name: 'nro_banco', length: 100 })
      nroBanco: string

  @Column('character varying', { name: 'nome', length: 100 })
      nome: string

  @Column('character varying', {
      name: 'descricao',
      nullable: true,
      length: 100,
      default: () => 'NULL::character varying',
  })
      descricao: string | null

  @Column('character varying', { name: 'cnpj', length: 100 })
      cnpj: string

  @Column('character varying', { name: 'site', length: 100 })
      site: string

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
