import { NextFunction, Request, Response } from 'express'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import config from '../config/api.config.json'

const limiter = new RateLimiterMemory({
    points: config.rateLimit.points,//quantas requisições por IP
    duration: config.rateLimit.duration,//segundos
})

export default async function rateLimit (req: Request, res: Response, next: NextFunction) {

    try {

        await limiter.consume(req.ip)
        return next()

    } catch (err) {

        return res.status(429).json({ message: 'Too many requests', code: 429 })

    }

}
