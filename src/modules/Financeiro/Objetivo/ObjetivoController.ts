import { Request } from 'express'
import { getRepository } from 'typeorm'
import { Objetivo } from '../../../entities/Objetivo'

export class ObjetivoController {

    private defaultRepository = getRepository(Objetivo)

    async all() {

        try {

            const all = await this.defaultRepository.find({ relations: ['objetivoMissaos'] })
            return all

        } catch (error) {

            return error

        }

    }

    async one(req: Request) {

        try {

            return await this.defaultRepository.findOne(req.params.id, { relations: ['objetivoMissaos'] })

        } catch (error) {

            return error

        }

    }

}
