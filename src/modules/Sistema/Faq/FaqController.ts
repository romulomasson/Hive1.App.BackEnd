import { Request } from 'express'
import { getRepository } from 'typeorm'
import { Pessoa } from '../../../entities/Pessoa'
import { Return } from '../../../interfaces/ApiReturn'
import { saveRequestResponseLog } from '../../../utils/loggers/requestResponseLogger'
import { sendError, sendSuccess } from '../../../utils/return'
import { Faq } from '../../../entities/Faq'

export class FaqController {

    private TbFAQRepository = getRepository(Faq)
    private TbUserRepository = getRepository(Pessoa)

    async all(): Promise<Return<Faq>> {

        try {

            const TbPessoas = await this.TbFAQRepository.createQueryBuilder('FAQ').select().orderBy('FAQ.id', 'DESC').getMany()
            saveRequestResponseLog('FAQs/getFAQs', 'info', {}, sendSuccess(TbPessoas))
            return sendSuccess(TbPessoas)

        } catch (error) {

            saveRequestResponseLog('FAQs/getFAQs', 'error', {}, sendError(error))
            return sendError(error)

        }

    }

    async save(request: Request) {

        try {

            const TbPessoaToSave = await this.TbUserRepository.findOne(request.body.idPessoa)
            const FaqToSave = new Faq()
            FaqToSave.nome = request.body.nome
            FaqToSave.pessoa = TbPessoaToSave
            FaqToSave.assunto = request.body.assunto
            FaqToSave.tema = request.body.tema
            FaqToSave.descricao = request.body.descricao

            const savedFaq = await this.TbFAQRepository.save(FaqToSave)

            saveRequestResponseLog('/faq/create', 'info', {}, sendSuccess(savedFaq))
            return sendSuccess(savedFaq)

        } catch (error) {

            saveRequestResponseLog('/faq/create', 'error', {}, sendError(error))
            return sendError(error)

        }

    }

    async remove(request: Request): Promise<Return<Faq>> {

        try {

            const TbPessoaToRemove = await this.TbFAQRepository.findOne(request.params.id)
            return sendSuccess([await this.TbFAQRepository.remove(TbPessoaToRemove)])

        } catch (error) {

            return sendError(error)

        }

    }

    async removeAll(): Promise<Return<string>> {

        try {

            await this.TbFAQRepository.createQueryBuilder().delete().where('1 = 1').execute()
            return sendSuccess(['OK'])

        } catch (error) {

            return sendError(error)

        }

    }

}
