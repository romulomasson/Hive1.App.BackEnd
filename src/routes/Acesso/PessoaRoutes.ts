import { Route } from '../../interfaces/Route'
import { PessoaController } from '../../modules/Acesso/Pessoa/PessoaController'
import { ContaBancariaController } from '../../modules/Acesso/PessoaContaBancaria/ContaBancariaController'
import { JornadaTrabalhoController } from '../../modules/Acesso/PessoaJornadaTrabalho/JornadaTrabalhoController'

export const Steps: Route[] = [
    {
        method: 'post',
        route: '/users/signupStep',
        controller: PessoaController,
        action: 'signUpStep'
    }, {
        method: 'post',
        route: '/users/personalInfoStep',
        controller: PessoaController,
        action: 'personalInfoStep'
    }, {
        method: 'post',
        route: '/users/workJourneyStep',
        controller: JornadaTrabalhoController,
        action: 'create'
    }, {
        method: 'post',
        route: '/users/financialStep',
        controller: ContaBancariaController,
        action: 'create'
    }, {
        method: 'post',
        route: '/users/saveThemeStep',
        controller: PessoaController,
        action: 'saveThemeStep'
    }, {
        method: 'post',
        route: '/users/selfieStep',
        controller: PessoaController,
        action: 'selfieStep'
    }, {
        method: 'post',
        route: '/users/documentStep',
        controller: PessoaController,
        action: 'documentStep'
    }, {
        method: 'post',
        route: '/users/selfieDocumentStep',
        controller: PessoaController,
        action: 'selfieDocumentStep'
    },
]

export const Actions: Route[] = [
    {
        method: 'post',
        route: '/users/login',
        controller: PessoaController,
        action: 'login'
    },
    {
        method: 'post',
        route: '/users/loginSocial',
        controller: PessoaController,
        action: 'loginSocial',
    }, {
        method: 'get',
        route: '/users/validarEmail/:uuid',
        controller: PessoaController,
        action: 'validarEmail'
    }, {
        method: 'get',
        route: '/users/verificaValidacoes/:id',
        controller: PessoaController,
        action: 'verificaValidacoes'
    }, {
        method: 'post',
        route: '/users/validarCadastro',
        controller: PessoaController,
        action: 'validarCadastro'
    }, {
        method: 'post',
        route: '/users/alterarSenha',
        controller: PessoaController,
        action: 'alterarSenha'
    }, {
        method: 'post',
        route: '/users/enviarSMS',
        controller: PessoaController,
        action: 'enviarSMS'
    }, {
        method: 'post',
        route: '/users/smsVerificado',
        controller: PessoaController,
        action: 'verificarSMS'
    }, {
        method: 'post',
        route: '/users/verificarCookies',
        controller: PessoaController,
        action: 'verificarCookies'
    }, {
        method: 'post',
        route: '/users/salvarFiltros',
        controller: PessoaController,
        action: 'salvarFiltros'
    },
]

export const TbPessoaRoutes: Route[] = [
    ...Steps, ...Actions,
    {
        method: 'get',
        route: '/users/getUsers',
        controller: PessoaController,
        action: 'all',
    }, {
        method: 'post',
        route: '/users/auth',
        controller: PessoaController,
        action: 'authUser'
    }, {
        method: 'delete',
        route: '/users/:id',
        controller: PessoaController,
        action: 'remove'
    }, {
        method: 'delete',
        route: '/users/',
        controller: PessoaController,
        action: 'removeAll'
    }
]
