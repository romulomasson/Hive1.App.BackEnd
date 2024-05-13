import { Request, Response, NextFunction } from 'express'

export interface Route {
    method: 'post' | 'get' | 'put' | 'delete',
    route: string,
    controller: any,
    action: string
    middlewares?: ((req: Request, res: Response, next: NextFunction) => unknown)[]
}
