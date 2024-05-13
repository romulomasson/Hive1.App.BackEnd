import { NextFunction, Request, Response } from 'express'
import { sendError } from '../utils/return'
import config from '../config/api.config.json'
import jwt from 'jsonwebtoken'

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

    try {

        if (!config.jwtAuth.on) return next()

        const path = `${req.path.split('/')[1]}/${req.path.split('/')[2]}`
        const notProtectedRoutes = ['users/login', 'users/signupStep', 'users/loginSocial', 'users/validarEmail']

        if (notProtectedRoutes.includes(path)) return next()

        const header = req.headers['authorization']
        if (!header) throw new Error('Token error1')

        const [scheme, token] = header.split(' ')
        if (scheme !== 'Bearer') throw new Error('Token error2')

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded) return next()

        return res.send(sendError('Unauthorized'))

    } catch (error) {

        return res.send(sendError(error))

    }

}
