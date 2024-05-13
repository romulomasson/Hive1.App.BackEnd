import { Request } from 'express'
import { getRepository, getConnection } from 'typeorm'
import { Pessoa } from '../../../entities/Pessoa'
import { PessoaConvite } from '../../../entities/PessoaConvite'
import { PessoaPonto } from '../../../entities/PessoaPonto'
import { saveRequestResponseLog } from '../../../utils/loggers/requestResponseLogger'
import { sendError, sendSuccess } from '../../../utils/return'

export class PessoaConviteController {

    private defaultRepository = getRepository(PessoaConvite)

    async all() {

        try {

            const TbPessoas = sendSuccess(await this.defaultRepository.find({ relations: ['pessoa'] }))
            saveRequestResponseLog('/pessoa-convite/all', 'info', {}, TbPessoas)
            return TbPessoas

        } catch (error) {

            saveRequestResponseLog('/pessoa-convite/all', 'error', {}, sendError(error))
            return sendError(error)

        }

    }

    async convidadosPorPessoaId(request: Request) {

        try {

            const pessoa = await getRepository(Pessoa).findOne(request.params.id)
            if (!pessoa) throw new Error('Pessoa não encontrada')

            let PessoaConvites = await this.defaultRepository.find({ where: { pessoa } })

            PessoaConvites = await Promise.all(PessoaConvites.map(async PessoaConvite => {

                return {
                    ...PessoaConvite,
                    nomeConvidado: (await getRepository(Pessoa).findOne(PessoaConvite.pessoaConvidadaId)).nome
                }

            }))

            saveRequestResponseLog('/pessoa-convite/convidadosPorPessoaId', 'info', {}, PessoaConvites)
            return PessoaConvites

        } catch (error) {

            saveRequestResponseLog('/pessoa-convite/convidadosPorPessoaId', 'error', {}, sendError(error))
            return sendError(error)

        }

    }

    async save(request: Request) {

        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {

            const newPessoaConvite = new PessoaConvite()

            const pessoa = await getRepository(Pessoa).findOne({ where: { codigo: request.body.codigo } })
            if (!pessoa) throw new Error('O código não existe')

            const pessoaConvidada = await getRepository(Pessoa).findOne(request.body.idPessoaConvidada)
            if (!pessoaConvidada) throw new Error('A pessoa convidada não existe')

            const pessoaConvite = await getRepository(PessoaConvite).findOne({ where: { pessoaConvidadaId: pessoaConvidada.id } })
            if (pessoaConvite) throw new Error('Você já foi convidado')
            if (pessoa.id === pessoaConvidada.id) throw new Error('Não é possível convidar a si mesmo')

            const pessoaPonto = await getRepository(PessoaPonto).findOne({ where: { pessoaId: pessoa.id } })
            if (!pessoaPonto) throw new Error('Você não possui ponto cadastrado, contate o suporte para resolver isso')

            newPessoaConvite.pessoa = pessoa
            newPessoaConvite.pessoaConvidadaId = request.body.idPessoaConvidada
            newPessoaConvite.dtCadastro = new Date()

            pessoaPonto.pontos += 10
            pessoaPonto.dtAlteracao = new Date()
            await queryRunner.manager.save(pessoaPonto)

            const result = await queryRunner.manager.save(newPessoaConvite)
            await queryRunner.commitTransaction()

            saveRequestResponseLog('/pessoa-convite', 'info', request.body, sendSuccess(result))
            return sendSuccess(result)

        } catch (error) {

            await queryRunner.rollbackTransaction()
            saveRequestResponseLog('/pessoa-convite', 'error', request.body, sendError(error))
            return sendError(error)

        }

    }

}
