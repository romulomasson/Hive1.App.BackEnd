import { Request } from 'express'
import { getRepository } from 'typeorm'
import { TipoTema } from '../../../entities/TipoTema'
import { Return } from '../../../interfaces/ApiReturn'
import { saveRequestResponseLog } from '../../../utils/loggers/requestResponseLogger'
import { sendError, sendSuccess } from '../../../utils/return'

export class TipoTemaController {

    private tipoTemaRepository = getRepository(TipoTema)

    async all(): Promise<Return<TipoTema>> {

        try {

            const tipoTemas = await this.tipoTemaRepository.find({ order: { id: 'ASC' } })
            saveRequestResponseLog('/tipoTema', 'info', {}, sendSuccess(TipoTema))
            return sendSuccess(tipoTemas)

        } catch (error) {

            saveRequestResponseLog('/tipoTema', 'error', {}, sendError(error))
            return sendError(error)

        }

    }

    async one(req: Request) {

        try {

            const tipoTema = await this.tipoTemaRepository.findOne(req.params.id)
            if (!tipoTema) throw new Error('Tipo de Tema não encontrado')
            saveRequestResponseLog('/tipoTema/:id', 'info', {}, sendSuccess(TipoTema))
            return sendSuccess(tipoTema)

        } catch (error) {

            saveRequestResponseLog('/tipoTema', 'error', {}, sendError(error))
            return sendError(error)

        }

    }

    async remove(request: Request): Promise<Return<TipoTema>> {

        try {

            const TbPessoaToRemove = await this.tipoTemaRepository.findOne(request.params.id)

            return sendSuccess([await this.tipoTemaRepository.remove(TbPessoaToRemove)])

        } catch (error) {

            return sendError(error)

        }

    }

    async removeAll(): Promise<Return<string>> {

        try {

            await this.tipoTemaRepository.createQueryBuilder().delete().where('1 = 1').execute()
            return sendSuccess(['OK'])

        } catch (error) {

            return sendError(error)

        }

    }

}
