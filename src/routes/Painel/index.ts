import { PainelController } from '../../modules/Painel/PainelController'
import { Route } from '../../interfaces/Route'

export const PainelRoutes: Route[] = [

    {
        method: 'get',
        route: '/painel/listarCadastros/:page',
        controller: PainelController,
        action: 'getPessoas',
    },
    {
        method: 'get',
        route: '/painel/cadastro/:id',
        controller: PainelController,
        action: 'getPessoaById',
    },
    {
        method: 'post',
        route: '/painel/validar',
        controller: PainelController,
        action: 'validatePessoa',
    }

]
