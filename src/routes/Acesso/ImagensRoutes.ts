import { Route } from '../../interfaces/Route'
import { PessoaImagemController } from '../../modules/Acesso/PessoaImagem/PessoaImagemController'

export const ImagesCrud: Route[] = [
    {
        method: 'post',
        route: '/images',
        controller: PessoaImagemController,
        action: 'create',
    },
    {
        method: 'get',
        route: '/images/all',
        controller: PessoaImagemController,
        action: 'all',
    },
    {
        method: 'delete',
        route: '/images/removeAll',
        controller: PessoaImagemController,
        action: 'removeAll',
    },
    {
        method: 'post',
        route: '/images/findById',
        controller: PessoaImagemController,
        action: 'findById',
    },

]
