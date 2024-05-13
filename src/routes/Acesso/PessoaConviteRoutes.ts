import { Route } from '../../interfaces/Route'
import { PessoaConviteController } from '../../modules/Acesso/PessoaConvite/PessoaConviteController'

export const PessoaConviteRoute: Route[] = [
    {
        method: 'post',
        route: '/pessoa-convite',
        controller: PessoaConviteController,
        action: 'save',
    },
    {
        method: 'get',
        route: '/pessoa-convite',
        controller: PessoaConviteController,
        action: 'all',
    },
    {
        method: 'get',
        route: '/pessoa-convite/convidados-por-pessoa/:id',
        controller: PessoaConviteController,
        action: 'convidadosPorPessoaId',
    },

]
