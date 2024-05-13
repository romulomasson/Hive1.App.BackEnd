
import { SistemaController } from '../../modules/Sistema/Sistema/SistemaController'
import { Route } from '../../interfaces/Route'

export const SistemaRoute: Route[] = [
    {
        method: 'get',
        route: '/sistema/versao',
        controller: SistemaController,
        action: 'verificaVersao',
    }
]
