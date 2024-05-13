import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('pessoa_endereco_pkey', ['id'], { unique: true })
@Entity('pessoa_endereco', { schema: 'public' })
export class PessoaEndereco {

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
        id: number

    @Column('integer', { name: 'pessoa_id' })
        pessoaId: number

    @Column('integer', { name: 'pais_id', nullable: true })
        paisId: number | null

    @Column('integer', { name: 'estado_id', nullable: true })
        estadoId: number | null

    @Column('character varying', { name: 'uf', length: 100 })
        uf: string

    @Column('character varying', { name: 'nome_cidade', length: 100 })
        nomeCidade: string

    @Column('integer', { name: 'tipo_endereco_id', nullable: true })
        tipoEnderecoId: number | null

    @Column('character varying', {
        name: 'cep',
        nullable: true,
        length: 100,
        default: () => 'NULL::character varying',
    })
        cep: string | null

    @Column('character varying', { name: 'logradouro', length: 100 })
        logradouro: string

    @Column('character varying', { name: 'numero', length: 100 })
        numero: string

    @Column('character varying', {
        name: 'complemento',
        nullable: true,
        length: 100,
        default: () => 'NULL::character varying',
    })
        complemento: string | null

    @Column('character varying', {
        name: 'zona',
        nullable: true,
        length: 100,
        default: () => 'NULL::character varying',
    })
        zona: string | null

    @Column('character varying', {
        name: 'bairro',
        nullable: true,
        length: 100,
        default: () => 'NULL::character varying',
    })
        bairro: string | null

    @Column('timestamp with time zone', { name: 'dt_cadastro' })
        dtCadastro: Date

    @Column('integer', { name: 'usuario_cadastro_id', nullable: true })
        usuarioCadastroId: number | null

    @Column('timestamp with time zone', { name: 'dt_alteracao', nullable: true })
        dtAlteracao: Date | null

    @Column('integer', { name: 'usuario_alteracao_id', nullable: true })
        usuarioAlteracaoId: number | null

    @Column('timestamp with time zone', { name: 'dt_exclusao', nullable: true })
        dtExclusao: Date | null

    @Column('integer', { name: 'usuario_exclusao_id', nullable: true })
        usuarioExclusaoId: number | null

    @Column('character varying', {
        name: 'motivo_exclusao',
        nullable: true,
        length: 100,
        default: () => 'NULL::character varying',
    })
        motivoExclusao: string | null

    @Column('real', { name: 'latitude', nullable: true, precision: 24 })
        latitude: number | null

    @Column('real', { name: 'longitude', nullable: true, precision: 24 })
        longitude: number | null

    @Column('boolean', { name: 'flag_ativo', nullable: true })
        flagAtivo: boolean | null

}
