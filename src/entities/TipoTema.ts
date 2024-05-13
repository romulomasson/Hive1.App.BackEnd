import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('tipo_tema_pkey', ['id'], { unique: true })
@Entity('tipo_tema', { schema: 'public' })
export class TipoTema {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
      id: number

  @Column('uuid', { name: 'uuid', default: () => 'uuid_generate_v4()' })
      uuid: string

  @Column('character varying', { name: 'descricao', length: 50 })
      descricao: string

  @Column('timestamp with time zone', { name: 'dt_cadastro' })
      dtCadastro: Date

  @Column('text', { name: 'foto' })
      foto: string

}
