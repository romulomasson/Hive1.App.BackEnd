import { getRepository } from 'typeorm'
import { Parceiro } from '../../entities/Parceiro'

export class ParceiroController {

    private defaultRepository = getRepository(Parceiro)

    async all() {

        try {

            return await this.defaultRepository.find({ relations: ['pessoa'] })

        } catch (error) {

            return error

        }

    }

}
