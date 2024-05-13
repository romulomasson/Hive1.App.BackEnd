import { Route } from '../../interfaces/Route'
import { JornadaTrabalhoController } from '../../modules/Acesso/PessoaJornadaTrabalho/JornadaTrabalhoController'

export const JornadaRouteCrud: Route[] = [
    {
        method: 'get',
        route: '/workingDay',
        controller: JornadaTrabalhoController,
        action: 'all',
    },
    {
        method: 'get',
        route: '/workingDay/:idPessoa',
        controller: JornadaTrabalhoController,
        action: 'getByIdPessoa',
    },
    {
        method: 'delete',
        route: '/workingDay/deleteAll',
        controller: JornadaTrabalhoController,
        action: 'deleteAll',
    },
]
