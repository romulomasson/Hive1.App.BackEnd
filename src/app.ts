import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import 'reflect-metadata'
import authMiddleware from './middlewares/auth.middleware'
import rateLimit from './middlewares/rateLimit.middleware'
import { Routes } from './routes'
import { sendError, sendSuccess } from './utils/return'
import morgan from 'morgan'
import { AbstractException } from './utils/errors/AbstractException'
import { saveUncaughtErrorLog } from './utils/loggers/uncaughtErrorLogger'

dotenv.config()

const app = express()
app.use(helmet())
    .use(cors())
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(rateLimit)
    .use(authMiddleware)

Routes.forEach(route => {

    process.setMaxListeners(2);

    (app as any)[route.method](route.route, 'middlewares' in route ? route.middlewares : [], async (req: Request, res: Response, next: NextFunction) => {

        try {

            const result = await (new (route.controller as any))[route.action](req, res, next)

            const isObject = typeof result === 'object'
            const isCustomException = result instanceof AbstractException

            if (isObject && 'dontSend' in result) return //Não retorna nada pois é esperado que a controller ja tenha retornado
            if (isObject && 'flagErro' in result) return res.send(result) //Já veio no padrão de retorno

            if (isCustomException) return res.status(result.statusCode).send(sendError(result))
            return result instanceof Error ? res.status(500).send(sendError(result)) : res.status(200).send(sendSuccess(result))

        } catch (error) {

            saveUncaughtErrorLog(req.path, req.body, error.message)
            return res.status(500).send(sendError(error))

        }

    })

})

export default app
