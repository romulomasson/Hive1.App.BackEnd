import { Route } from '../../interfaces/Route'
import { ContaBancariaController } from '../../modules/Acesso/PessoaContaBancaria/ContaBancariaController'

export const FinancialCrud: Route[] = [
    {
        method: 'get',
        route: '/financial',
        controller: ContaBancariaController,
        action: 'all',
    },
    {
        method: 'get',
        route: '/financial/getById/:idPessoa',
        controller: ContaBancariaController,
        action: 'getById',
    },
    {
        method: 'delete',
        route: '/financial/deleteAll',
        controller: ContaBancariaController,
        action: 'deleteAll',
    },
]
