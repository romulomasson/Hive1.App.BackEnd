import { Route } from '../../interfaces/Route'
import { ObjetivoController } from '../../modules/Financeiro/Objetivo/ObjetivoController'

export const MissaoRoute: Route[] = [
    {
        method: 'get',
        route: '/objetivo',
        controller: ObjetivoController,
        action: 'all',
    },
    {
        method: 'get',
        route: '/objetivo/:id',
        controller: ObjetivoController,
        action: 'one',
    }
]
