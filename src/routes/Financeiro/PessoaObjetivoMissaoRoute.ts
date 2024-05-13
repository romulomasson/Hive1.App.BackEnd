import { Route } from '../../interfaces/Route'
import { PessoaObjetivoMissaoController } from '../../modules/Financeiro/PessoaMissao/PessoaObjetivoMissaoController'

export const PessoaObjetivoMissaoRoute: Route[] = [
    {
        method: 'post',
        route: '/pessoa-missao',
        controller: PessoaObjetivoMissaoController,
        action: 'userCompleteMission',
    },
    {
        method: 'get',
        route: '/pessoa-missao/:id',
        controller: PessoaObjetivoMissaoController,
        action: 'userMissionsStatus',
    },
    {
        method: 'get',
        route: '/objetivo/valida-login/:id',
        controller: PessoaObjetivoMissaoController,
        action: 'concluirLoginSemanal',
    }
]
