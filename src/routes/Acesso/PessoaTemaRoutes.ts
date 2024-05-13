import { Route } from '../../interfaces/Route'
import { PessoaTemaController } from '../../modules/Acesso/PessoaTema/PessoaTemaController'

export const PessoaTemaRoute: Route[] = [
    {
        method: 'delete',
        route: '/pessoaTema',
        controller: PessoaTemaController,
        action: 'removeAll',
    }
]
