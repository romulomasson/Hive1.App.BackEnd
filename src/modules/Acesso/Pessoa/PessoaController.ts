import { Request } from 'express'
import { getManager, getRepository } from 'typeorm'
import { Faq } from '../../../entities/Faq'
import { Pessoa } from '../../../entities/Pessoa'
import { PessoaConvite } from '../../../entities/PessoaConvite'
import { PessoaImagens } from '../../../entities/PessoaImagens'
import { Return } from '../../../interfaces/ApiReturn'
import { saveRequestResponseLog } from '../../../utils/loggers/requestResponseLogger'
import { sendError, sendSuccess } from '../../../utils/return'
import { ActionsController } from './ActionsController'

export class PessoaController extends ActionsController {

    private TbPessoaRepository = getRepository(Pessoa)
    private TbFaqRepository = getRepository(Faq)
    private TbPessoaImagemRepository = getRepository(PessoaImagens)

    async all(): Promise<Return<Pessoa>> {

        try {

            const TbPessoas = await this.TbPessoaRepository.createQueryBuilder('user').select().orderBy('user.id', 'DESC').getMany()
            saveRequestResponseLog('users/getUsers', 'info', {}, sendSuccess(TbPessoas))
            return sendSuccess(TbPessoas)

        } catch (error) {

            saveRequestResponseLog('users/getUsers', 'error', {}, sendError(error))
            return error

        }

    }

    async remove(request: Request) {

        try {

            let pessoa
            if (request.params.id !== 'lg') pessoa = await this.TbPessoaRepository.findOne({ where: { id: request.params.id } })
            else pessoa = await this.TbPessoaRepository.findOne({ where: { email: 'luisgustavofeitoza@gmail.com' } })
            if (!pessoa) throw new Error('Pessoa não encontrada')

            await getManager().query(`CALL delete_hiver(${pessoa.id})`)
            saveRequestResponseLog('users/remove', 'info', {}, sendSuccess({ msg: 'deletado' }))
            return sendSuccess({ msg: 'deletado' })

        } catch (error) {

            return sendError(error)

        }

    }

    async removeAll(): Promise<Return<string>> {

        try {

            await this.TbFaqRepository.createQueryBuilder().delete().where('1 = 1').execute()
            await this.TbPessoaImagemRepository.createQueryBuilder().delete().where('1 = 1').execute()
            await this.TbPessoaRepository.createQueryBuilder().delete().where('1 = 1').execute()
            await getRepository(PessoaConvite).createQueryBuilder().delete().where('1 = 1').execute()

            return sendSuccess(['OK'])

        } catch (error) {

            return error

        }

    }

}

