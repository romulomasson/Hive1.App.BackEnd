export interface Endereco {
    id: number;
    pessoaId: number;
    paisId: number;
    estadoId: number;
    uf: string;
    nomeCidade: string;
    tipoEnderecoId: number;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    zona: null;
    bairro: null;
    dtCadastro: Date;
    usuarioCadastroId: null;
    dtAlteracao: Date;
    usuarioAlteracaoId: null;
    dtExclusao: null;
    usuarioExclusaoId: null;
    motivoExclusao: null;
}

export interface Jornada {
    id: number;
    uuid: string;
    pessoaId: number;
    diaSemana: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'
    periodo: 'morning' | 'afternoon'
    observacoes: null;
    dtCadastro: Date;
    usuarioCadastroId: null;
    dtAlteracao: null;
    usuarioAlteracaoId: null;
    dtExclusao: null;
    usuarioExclusaoId: null;
    motivoExclusao: null;
}

export interface Conta {
    id: number;
    pessoaId: number;
    bancoId: number;
    nroAgencia: string;
    digitoAgencia: null;
    nroConta: string;
    digitoConta: null;
    operacaoConta: null;
    pix: string;
    documentoTitular: string;
    nomeTitular: string;
    razaoSocialTitular: string;
    tipoConta: string;
    descricao: null;
    ativo: null;
    flagPrincipal: null;
    dtCadastro: Date;
    usuarioCadastroId: null;
    dtAlteracao: null;
    usuarioAlteracaoId: null;
    dtExclusao: null;
    usuarioExclusaoId: null;
    motivoExclusao: null;
}

export interface Imagens {
    id: number
    uuid: string
    pessoaId: number
    imgFace: null
    imgDocBack: null
    imgDocFront: null
    imgSelfDoc: null
    imgAvatar: string
}

export interface Tema {
    id: number
    uuid: string
    pessoa: number
    temaId: number
}

export interface Pontos {
    id: number
    uuid: string
    pessoaId: number
    pontos: number
    dtAlteracao: Date
    dtCadastro: Date
}

export interface PessoaRetorno {
    id: number
    uuid: string
    perfilAcessoId: number | null
    tipoRedeSocialId: number | null
    referenciaRedeSocialId: number
    statusId: number | null
    codigo: string | null
    flagTipoPessoa: string | null
    tipoDocumentoId: number | null
    nroDocumento: number | null
    nome: string
    apelido: string | null
    razaoSocial: string | null
    inscricaoEstadual: number | null
    inscricaoMunicipal: number | null
    rg: number | null
    ufRg: number | null
    orgaoEmissorRg: string | null
    paisOrigemId: number | null
    nomeCidadeOrigem: string | null
    dtNascimento: Date | null
    flagSexo: 'M' | 'F' | 'O' | null
    nomePai: string | null
    nomeMae: string | null
    telPrincipal: number | null
    telSecundario: number | null
    flagCadastroAprovado: boolean | null
    dtValidacaoCadastro: Date | null
    email: string
    dtEmailValidacao: Date | null
    login: string | null
    senha: string | null
    flagAlterarSenha: boolean | null
    observacoes: string | null
    temaEscolhido: string | null
    tamanhoCamisa: string | null
    smsVerificado: boolean | null
    dtCadastro: Date | null
    usuarioCadastroId: number | null
    dtAlteracao: Date | null
    usuarioAlteracaoId: number | null
    dtExclusao: Date | null
    usuarioExclusaoId: number | null
    motivoExclusao: string | null
    endereco: Endereco | null
    jornada: Jornada[] | null
    conta: Conta | null
    imagens: Imagens | null
    temas?: Tema[] | null
    pontos: Pontos | null
}
