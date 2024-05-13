import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('compartilhe_semanal', { schema: 'logica' })
export class CompartilheSemanal {

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

  @Column('timestamp with time zone', { name: 'dt_inicio' })
      dtInicio: Date

  @Column('timestamp with time zone', { name: 'dt_fim' })
      dtFim: Date

  @Column('integer', { name: 'quantidade_compartilhamentos' })
      quantidadeCompartilhamentos: number

}
