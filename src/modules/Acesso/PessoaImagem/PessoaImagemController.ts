import { Request } from 'express'
import { getRepository } from 'typeorm'
import { Pessoa } from '../../../entities/Pessoa'
import { PessoaImagens } from '../../../entities/PessoaImagens'
import { saveRequestResponseLog } from '../../../utils/loggers/requestResponseLogger'
import { sendError, sendSuccess } from '../../../utils/return'
import { PainelController } from '../../Painel/PainelController'

export class PessoaImagemController {

    private PessoaImagemRepository = getRepository(PessoaImagens)
    private TbPessoaRepository = getRepository(Pessoa)

    async create(request: Request) {

        try {

            const bodyInstance = request.body
            const pessoa = await this.TbPessoaRepository.findOne({ where: { id: request.body.idPessoa } })

            if (!pessoa) throw new Error('Usuário não encontrado')
            if (!request.body.idPessoa) throw new Error('Id da pessoa é obrigatório')

            const imagesToSave = await this.PessoaImagemRepository.findOne({ where: { pessoaId: request.body.idPessoa } })

            delete bodyInstance.idPessoa
            for (const imgCampo in request.body) (imagesToSave as any)[imgCampo] = bodyInstance[imgCampo]

            const saved = await this.PessoaImagemRepository.save(imagesToSave)

            const retornoPessoa = await PainelController.methodGetPessoaById(saved.pessoaId)

            saveRequestResponseLog('/images/create', 'info', request.body, sendSuccess(retornoPessoa))
            return (sendSuccess(retornoPessoa))

        } catch (error) {

            saveRequestResponseLog('/images/create', 'error', request.body, sendError(error))
            return error

        }

    }

    async findById(request: Request) {

        try {

            const send = sendSuccess(await this.PessoaImagemRepository.createQueryBuilder('PessoaImagens').where('PessoaImagens.pessoaId = :id', { id: request.body.idPessoa }).getOne())
            saveRequestResponseLog('/images/findById', 'info', {}, send)
            return (send)

        } catch (error) {

            saveRequestResponseLog('/images/findById', 'error', request.body, sendError(error))
            return error

        }

    }

    async all(request: Request) {

        try {

            const send = sendSuccess(await this.PessoaImagemRepository.find())
            saveRequestResponseLog('/images/all', 'info', {}, send)
            return (send)

        } catch (error) {

            saveRequestResponseLog('/images/all', 'error', request.body, sendError(error))
            return error

        }

    }

    async removeAll() {

        try {

            await this.PessoaImagemRepository.createQueryBuilder('img').delete().where('1=1').execute()
            return ({ msg: 'deletados' })

        } catch (error) {

            return error

        }

    }

}
