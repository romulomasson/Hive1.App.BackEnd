import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Pessoa } from './Pessoa'

@Index('faq_pkey', ['id'], { unique: true })
@Entity('faq', { schema: 'public' })
export class Faq {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('character varying', { name: 'nome', length: 50 })
      nome: string

  @Column('character varying', { name: 'tema', length: 50 })
      tema: string

  @Column('character varying', { name: 'assunto', length: 100 })
      assunto: string

  @Column('text', { name: 'descricao' })
      descricao: string

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.faqs, { onDelete: 'CASCADE' })
  @JoinColumn([
      { name: 'pessoa_id', referencedColumnName: 'id' },
      { name: 'pessoa_id', referencedColumnName: 'id' },
  ])
      pessoa: Pessoa

}
