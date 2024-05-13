import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Pessoa } from './Pessoa'

@Index('pk', ['id'], { unique: true })
@Entity('parceiro', { schema: 'parceiro' })
export class Parceiro {

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

    @Column('character varying', { name: 'slogan', nullable: true, length: 50 })
        slogan: string | null

    @Column('character varying', { name: 'logo', nullable: true, length: 250 })
        logo: string | null

    @Column('real', { name: 'cotacao', nullable: true, precision: 24 })
        cotacao: number | null

    @ManyToOne(() => Pessoa, (pessoa) => pessoa.parceiros)
    @JoinColumn([{ name: 'pessoa_id', referencedColumnName: 'id' }])
        pessoa: Pessoa

    @Column('text', { name: 'descricao', nullable: true })
        descricao: string | null

    @Column('text', { name: 'sobre', nullable: true })
        sobre: string | null

    @Column('text', { name: 'como_ganhar_pontos', nullable: true })
        comoGanharPontos: string | null

    @Column('text', { name: 'regras', nullable: true })
        regras: string | null

}
