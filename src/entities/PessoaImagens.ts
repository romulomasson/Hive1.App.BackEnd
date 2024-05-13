import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Pessoa } from './Pessoa'

@Index('pessoa_imagens_pkey', ['pessoaId'], { unique: true })
@Entity('pessoa_imagens', { schema: 'public' })
export class PessoaImagens {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('uuid', { name: 'uuid', default: () => 'uuid_generate_v4()' })
      uuid: string

  @Column('integer', { primary: true, name: 'pessoa_id' })
      pessoaId: number

  @Column('character varying', { name: 'img_face', nullable: true })
      imgFace: string | null

  @Column('character varying', { name: 'img_doc_back', nullable: true })
      imgDocBack: string | null

  @Column('character varying', { name: 'img_doc_front', nullable: true })
      imgDocFront: string | null

  @Column('character varying', { name: 'img_self_doc', nullable: true })
      imgSelfDoc: string | null

  @Column('character varying', { name: 'img_avatar', nullable: true })
      imgAvatar: string | null

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.pessoaImagens, {
      onDelete: 'CASCADE',
  })
  @JoinColumn([
      { name: 'pessoa_id', referencedColumnName: 'id' },
      { name: 'pessoa_id', referencedColumnName: 'id' },
  ])
      pessoa: Pessoa

}
