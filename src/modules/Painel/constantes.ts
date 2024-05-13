const defaultValue = 'Não informado'

export const cadastroBasico = [
    { label: 'ID', value: 'id' },
    { label: 'Email', value: 'email' },
    { label: 'Email confirmado?', value: 'dtEmailValidacao', boolean: true },
    { label: 'Documento', value: 'nroDocumento', defaultValue },
    { label: 'Sexo', value: 'flagSexo' },
    { label: 'Telefone', value: 'telPrincipal' },
    { label: 'Cadastro realizado em:', value: 'dtCadastro', formatDate: true },
    { label: 'Tema escolhido', value: 'temaEscolhido', defaultValue },
    { label: 'Tamanho da camisa', value: 'tamanhoCamisa', defaultValue },
]

export const cadastroEndereco = [
    { label: 'Rua', value: 'logradouro' },
    { label: 'Número', value: 'numero' },
    { label: 'Complemento', value: 'complemento', defaultValue },
    { label: 'CEP', value: 'cep' },
    { label: 'Cidade', value: 'nomeCidade' },
    { label: 'UF', value: 'uf' },
    { label: 'Bairro', value: 'bairro', defaultValue },
]

export const cadastroFinanceiro = [
    { label: 'Agencia', value: 'nroAgencia' },
    { label: 'Conta', value: 'nroConta' },
    { label: 'PIX', value: 'pix', defaultValue },
    { label: 'CNPJ', value: 'documentoTitular' },
    { label: 'Nome fantasia', value: 'nomeTitular' },
]

export const cadastroImagens = [
    { label: 'Avatar', value: 'imgAvatar' },
    { label: 'Foto do rosto', value: 'imgFace' },
    { label: 'Frente do documento', value: 'imgDocFront' },
    { label: 'Tras do documento', value: 'imgDocBack' },
    { label: 'Foto segurando o documento', value: 'imgSelfDoc' },
]

export const diasSemana = [{ pt: 'Segunda', en: 'mon' }, { pt: 'Terça', en: 'tue' }, { pt: 'Quarta', en: 'wed' }, { pt: 'Quinta', en: 'thu' }, { pt: 'Sexta', en: 'fri' }, { pt: 'Sábado', en: 'sat' }]
