export interface MissaoFilho {
    id: number;
    paiId: number | null;
    titulo: string;
    descricao: string;
    pontos: number;
    dtFim: Date;
    dtInicio: Date;
    motivoExclusao: string | null;
    ativo: boolean;
    dtCadastro: Date;
    usuarioCadastroId: number | null;
    dtAlteracao: Date | null;
    usuarioAlteracaoId: number | null;
    dtExclusao: Date | null;
    usuarioExclusaoId: number | null;
    filhos?: MissaoFilho[];
}
