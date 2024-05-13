import { Route } from '../../interfaces/Route'
import { ParceiroController } from '../../modules/Parceiro/ParceiroController'

export const ParceiroRoutes: Route[] = [
    {
        method: 'get',
        route: '/parceiros',
        controller: ParceiroController,
        action: 'all',
    }
]
