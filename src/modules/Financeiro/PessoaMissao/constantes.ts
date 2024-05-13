import { PessoaRetorno } from '../../../interfaces/Pessoa/PessoaRetorno'

export const generateCadastroValidation = (pessoa: PessoaRetorno) => [

    { descricao: 'Cadastro de E-mail', condition: true },
    { descricao: 'Cadastro de Informações Pessoais', condition: pessoa.flagSexo || pessoa.telPrincipal },
    { descricao: 'Cadastro de Disponibilidade', condition: pessoa.jornada.length > 0 },
    { descricao: 'Cadastro de Informações Financeiras', condition: pessoa.conta },
    { descricao: 'Validação do device', condition: pessoa.flagCadastroAprovado && pessoa.smsVerificado },
    { descricao: 'Upload de fotos', condition: pessoa.flagCadastroAprovado && pessoa.imagens && pessoa.imagens.imgAvatar && pessoa.imagens.imgDocBack && pessoa.imagens.imgDocFront && pessoa.imagens.imgFace && pessoa.imagens.imgSelfDoc },
    { descricao: 'Validação do cadastro', condition: pessoa.flagCadastroAprovado },

]
