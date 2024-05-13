import { Route } from '../interfaces/Route'
import { FaqCrud } from './Sistema/FaqRoutes'
import { FinancialCrud } from './Acesso/FinancialRoutes'
import { ImagesCrud } from './Acesso/ImagensRoutes'
import { JornadaRouteCrud } from './Acesso/JornadaTrabalhoRoutes'
import { LogsRoute } from './Sistema/LogsRoutes'
import { PainelRoutes } from './Painel'
import { PessoaConviteRoute } from './Acesso/PessoaConviteRoutes'
import { TbPessoaRoutes } from './Acesso/PessoaRoutes'
import { PessoaTemaRoute } from './Acesso/PessoaTemaRoutes'
import { SistemaRoute } from './Sistema/SistemaRoutes'
import { TipoTemaRoute } from './Sistema/TipoTemaRoutes'
import { MissaoRoute } from './Financeiro/ObjetivoRoute'
import { PessoaObjetivoMissaoRoute } from './Financeiro/PessoaObjetivoMissaoRoute'
import { ParceiroRoutes } from './Parceiro/ParceiroRoute'

export const Routes: Route[] = [
    ...TbPessoaRoutes,
    ...JornadaRouteCrud,
    ...LogsRoute,
    ...FinancialCrud,
    ...PainelRoutes,
    ...ImagesCrud,
    ...FaqCrud,
    ...PessoaTemaRoute,
    ...TipoTemaRoute,
    ...SistemaRoute,
    ...PessoaConviteRoute,
    ...MissaoRoute,
    ...PessoaObjetivoMissaoRoute,
    ...ParceiroRoutes
]
