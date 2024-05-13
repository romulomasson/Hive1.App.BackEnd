import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ParceiroProdutoImagem } from './ParceiroProdutoImagem'

@Index('parceiro_produto_pkey', ['id'], { unique: true })
@Entity('parceiro_produto', { schema: 'parceiro' })
export class ParceiroProduto {

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

  @Column('integer', { name: 'parceiro_id' })
      parceiroId: number

  @Column('character varying', { name: 'nome', length: 100 })
      nome: string

  @Column('text', { name: 'descricao', nullable: true })
      descricao: string | null

  @Column('real', { name: 'preco', precision: 24 })
      preco: number

  @Column('character varying', { name: 'link', nullable: true, length: 300 })
      link: string | null

  @Column('character varying', {
      name: 'categoria',
      nullable: true,
      length: 25,
  })
      categoria: string | null

  @Column('character varying', { name: 'cor', nullable: true, length: 15 })
      cor: string | null

  @Column('character varying', { name: 'marca', nullable: true })
      marca: string | null

  @Column('boolean', { name: 'flag_diponivel', default: () => 'true' })
      flagDiponivel: boolean

  @Column('real', { name: 'preco_clube', nullable: true, precision: 24 })
      precoClube: number | null

  @OneToMany(
      () => ParceiroProdutoImagem,
      (parceiroProdutoImagem) => parceiroProdutoImagem.produto
  )
      parceiroProdutoImagems: ParceiroProdutoImagem[]

}
