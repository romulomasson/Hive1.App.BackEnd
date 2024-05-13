
import { FaqController } from '../../modules/Sistema/Faq/FaqController'
import { Route } from '../../interfaces/Route'

export const FaqCrud: Route[] = [
    {
        method: 'post',
        route: '/faq/create',
        controller: FaqController,
        action: 'save',
    },
    {
        method: 'get',
        route: '/images/all',
        controller: FaqController,
        action: 'all',
    },
    {
        method: 'post',
        route: '/images/findById',
        controller: FaqController,
        action: 'findById',
    },

]
