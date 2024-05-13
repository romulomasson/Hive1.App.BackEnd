import { Request } from 'express'
import { getRepository } from 'typeorm'
import { PessoaTema } from '../../../entities/PessoaTema'
import { Return } from '../../../interfaces/ApiReturn'
import { saveRequestResponseLog } from '../../../utils/loggers/requestResponseLogger'
import { sendError, sendSuccess } from '../../../utils/return'

export class PessoaTemaController {

    private pessoaTemaRepository = getRepository(PessoaTema)

    async all() {

        try {

            const TbPessoas = await this.pessoaTemaRepository.createQueryBuilder('user').select().orderBy('user.id', 'DESC').getMany()
            saveRequestResponseLog('/pessoaTema', 'info', {}, sendSuccess(TbPessoas))
            return sendSuccess(TbPessoas)

        } catch (error) {

            saveRequestResponseLog('/pessoaTema', 'error', {}, sendError(error))
            return sendError(error)

        }

    }

    async remove(request: Request) {

        try {

            const TbPessoaToRemove = await this.pessoaTemaRepository.findOne(request.params.id)

            return sendSuccess([await this.pessoaTemaRepository.remove(TbPessoaToRemove)])

        } catch (error) {

            return sendError(error)

        }

    }

    async removeAll(): Promise<Return<string>> {

        try {

            await this.pessoaTemaRepository.createQueryBuilder().delete().where('1 = 1').execute()
            return sendSuccess(['OK'])

        } catch (error) {

            return sendError(error)

        }

    }

}
