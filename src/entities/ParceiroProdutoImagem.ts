import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ParceiroProduto } from './ParceiroProduto'

@Index('parceiro_produto_imagem_pkey', ['id'], { unique: true })
@Entity('parceiro_produto_imagem', { schema: 'parceiro' })
export class ParceiroProdutoImagem {

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

  @Column('character varying', { name: 'link', length: 300 })
      link: string

  @Column('character varying', {
      name: 'descricao',
      nullable: true,
      length: 100,
  })
      descricao: string | null

  @ManyToOne(
      () => ParceiroProduto,
      (parceiroProduto) => parceiroProduto.parceiroProdutoImagems
  )
  @JoinColumn([{ name: 'produto_id', referencedColumnName: 'id' }])
      produto: ParceiroProduto

}
