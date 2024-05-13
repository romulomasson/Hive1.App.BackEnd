import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('entregas_pkey', ['id'], { unique: true })
@Entity('entrega', { schema: 'entrega' })
export class Entrega {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

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

  @Column('time without time zone', { name: 'dt_exclusao', nullable: true })
      dtExclusao: string | null

  @Column('integer', { name: 'usuario_exclusao_id', nullable: true })
      usuarioExclusaoId: number | null

  @Column('boolean', { name: 'flag_ativo', nullable: true })
      flagAtivo: boolean | null

  @Column('integer', { name: 'peso' })
      peso: number

  @Column('timestamp with time zone', { name: 'prazo_final' })
      prazoFinal: Date

  @Column('integer', { name: 'desafio_id', nullable: true })
      desafioId: number | null

  @Column('character varying', { name: 'endereco', length: 250 })
      endereco: string

  @Column('real', { name: 'latitude', precision: 24 })
      latitude: number

  @Column('real', { name: 'longitude', precision: 24 })
      longitude: number

}
