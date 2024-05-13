
import { getRepository } from 'typeorm'
import { SistemaMeta } from '../../../entities/SistemaMeta'

export class SistemaController {

    async verificaVersao() {

        try {

            return (await getRepository(SistemaMeta).findOne({ key: 'versao_app' })).value

        } catch (error) {

            return error

        }

    }

}

