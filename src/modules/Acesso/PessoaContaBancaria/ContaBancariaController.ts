
import { Request } from 'express'
import { getRepository } from 'typeorm'
import { Pessoa } from '../../../entities/Pessoa'
import { PessoaContaBancaria } from '../../../entities/PessoaContaBancaria'
import { CreateFinancialInfoBody } from '../../../interfaces/ContaBancaria/types'
import { saveRequestResponseLog } from '../../../utils/loggers/requestResponseLogger'
import { sendError, sendSuccess } from '../../../utils/return'
import { PainelController } from '../../Painel/PainelController'

export class ContaBancariaController {

    private ContaBancariaRepository = getRepository(PessoaContaBancaria)

    async create(request: Request) {

        try {

            const body = request.body as CreateFinancialInfoBody

            const pessoa = await getRepository(Pessoa).findOne(body.idPessoa)
            if (!pessoa) throw new Error('Pessoa não encontrada')

            const contaBancaria = new PessoaContaBancaria()
            contaBancaria.pessoaId = body.idPessoa
            contaBancaria.bancoId = body.idBanco
            contaBancaria.tipoConta = body.tipoConta
            contaBancaria.nroAgencia = body.agencia
            contaBancaria.nroConta = body.conta
            contaBancaria.pix = body.pix ?? 'Pix não cadastrado'
            contaBancaria.razaoSocialTitular = body.razaoSocial
            contaBancaria.documentoTitular = body.cnpj
            contaBancaria.nomeTitular = body.nomeFantasia
            contaBancaria.dtCadastro = new Date()
            await this.ContaBancariaRepository.save(contaBancaria)

            const retornoPessoa = await PainelController.methodGetPessoaById(body.idPessoa)

            saveRequestResponseLog('contaBancaria/create', 'info', request.body, sendSuccess(retornoPessoa))
            return (sendSuccess(retornoPessoa))

        } catch (error) {

            saveRequestResponseLog('contaBancaria/create', 'error', request.body, sendError(error))
            return error

        }

    }

    async all(request: Request) {

        try {

            const contaBancaria = await this.ContaBancariaRepository.find()
            saveRequestResponseLog('contaBancaria/getAll', 'info', request.body, sendSuccess(contaBancaria))
            return (sendSuccess(contaBancaria))

        } catch (error) {

            saveRequestResponseLog('contaBancaria/getAll', 'error', request.body, sendError(error))
            return error

        }

    }

    async getById(request: Request) {

        try {

            const contaBancaria = await this.ContaBancariaRepository.createQueryBuilder('conta').select().where('conta.idpessoa = :id', { id: request.params.id }).getOne()
            saveRequestResponseLog('contaBancaria/getById', 'info', request.body, sendSuccess(contaBancaria))
            return (sendSuccess(contaBancaria))

        } catch (error) {

            saveRequestResponseLog('contaBancaria/getById', 'error', request.body, sendError(error))
            return error

        }

    }

    async deleteAll(request: Request) {

        try {

            await this.ContaBancariaRepository.delete({})
            saveRequestResponseLog('contaBancaria/deleteAll', 'info', request.body, sendSuccess('Apagados'))
            return (sendSuccess('Apagados'))

        } catch (error) {

            saveRequestResponseLog('contaBancaria/deleteAll', 'error', request.body, sendError(error))
            return error

        }

    }

}

