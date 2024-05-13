import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Pessoa } from './Pessoa'

@Index('pessoa_convite_pkey', ['id'], { unique: true })
@Entity('pessoa_convite', { schema: 'public' })
export class PessoaConvite {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('integer', { name: 'pessoa_convidada_id' })
      pessoaConvidadaId: number

  @Column('timestamp with time zone', { name: 'dt_cadastro' })
      dtCadastro: Date

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.pessoaConvites)
  @JoinColumn([{ name: 'pessoa_id', referencedColumnName: 'id' }])
      pessoa: Pessoa

}
