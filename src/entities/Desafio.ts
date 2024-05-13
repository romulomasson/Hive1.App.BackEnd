import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Pessoa } from './Pessoa'

@Index('desafio_tmp_pkey', ['id'], { unique: true })
@Entity('desafio', { schema: 'entrega' })
export class Desafio {

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

    @Column('integer', { name: 'peso_total' })
        pesoTotal: number

    @Column('text', { name: 'geometry' })
        geometry: string

    @Column('character varying', { name: 'situacao', length: 20 })
        situacao: string

    @Column('integer', { name: 'distancia_total' })
        distanciaTotal: number

    @Column('character varying', {
        name: 'distancia_total_formatada',
        length: 10,
    })
        distanciaTotalFormatada: string

    @Column('integer', { name: 'duracao_total' })
        duracaoTotal: number

    @Column('character varying', { name: 'duracao_total_formatada', length: 20 })
        duracaoTotalFormatada: string

    @Column('uuid', { name: 'uuid' })
        uuid: string

    @Column('integer', { name: 'quantidade_pacote', default: () => '0' })
        quantidadePacote: number

    @ManyToOne(() => Pessoa, (pessoa) => pessoa.desafios)
    @JoinColumn([{ name: 'pessoa_id', referencedColumnName: 'id' }])
        pessoa: Pessoa

}

