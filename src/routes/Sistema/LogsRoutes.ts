import { Route } from '../../interfaces/Route'
import { LogController } from '../../modules/Sistema/Logs/LogsController'

export const LogsRoute: Route[] = [
    {
        method: 'get',
        route: '/logs/:log',
        controller: LogController,
        action: 'all',
    }
]
