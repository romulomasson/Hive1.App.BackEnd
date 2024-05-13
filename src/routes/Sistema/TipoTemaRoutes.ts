import { Route } from '../../interfaces/Route'
import { TipoTemaController } from '../../modules/Sistema/TipoTema/TipoTemaController'

export const TipoTemaRoute: Route[] = [
    {
        method: 'get',
        route: '/tipoTema/all',
        controller: TipoTemaController,
        action: 'all',
    },
    {
        method: 'get',
        route: '/tipoTema/:id',
        controller: TipoTemaController,
        action: 'one',
    },
    {
        method: 'post',
        route: '/tipoTema',
        controller: TipoTemaController,
        action: 'save',
    },
]
