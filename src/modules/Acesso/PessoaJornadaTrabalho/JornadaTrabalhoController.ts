import { Request } from 'express'
import { getRepository } from 'typeorm'
import { Pessoa } from '../../../entities/Pessoa'
import { PessoaJornadaTrabalho } from '../../../entities/PessoaJornadaTrabalho'
import { CreateBody, WeekDay } from '../../../interfaces/JornadaTrabalho/types'
import { saveRequestResponseLog } from '../../../utils/loggers/requestResponseLogger'
import { sendError, sendSuccess } from '../../../utils/return'
import { PainelController } from '../../Painel/PainelController'

export class JornadaTrabalhoController {

    private JornadaRepository = getRepository(PessoaJornadaTrabalho)

    async create(req: Request) {

        try {

            const body = req.body as CreateBody

            const pessoa = await getRepository(Pessoa).findOne(body.idPessoa)
            if (!pessoa) throw new Error('Pessoa não encontrada')

            const createdJourneys = []

            const jornada = new PessoaJornadaTrabalho()

            jornada.pessoaId = req.body.idPessoa

            for (const workingDay of body.data) {

                if (!(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].includes(workingDay.day))) throw new Error('Dia da semana inválido')
                if (!(['morning', 'afternoon'].includes(workingDay.timeCourse))) throw new Error('Periodo inválido')

                const [shortDayStart, shortDayEnd] = [0, 3]
                jornada.diaSemana = workingDay.day.substring(shortDayStart, shortDayEnd) as WeekDay
                jornada.periodo = workingDay.timeCourse
                jornada.dtCadastro = new Date()
                createdJourneys.push(this.JornadaRepository.create(jornada))

            }

            await this.JornadaRepository.save(createdJourneys)
            const retornoPessoa = await PainelController.methodGetPessoaById(body.idPessoa)

            saveRequestResponseLog('workingDay/create', 'info', req.body, sendSuccess(retornoPessoa))
            return (sendSuccess(retornoPessoa))

        } catch (error) {

            saveRequestResponseLog('workingDay/create', 'error', req.body, sendError(error))
            return error

        }

    }

    async all(req: Request) {

        try {

            const journeys = await this.JornadaRepository.createQueryBuilder('jornada').select().orderBy('jornada.id', 'DESC').getMany()

            saveRequestResponseLog('workingDay/all', 'info', req.body, sendSuccess(journeys))
            return (sendSuccess(journeys))

        } catch (error) {

            saveRequestResponseLog('workingDay/all', 'error', req.body, sendError(error))
            return error

        }

    }

    async getByIdPessoa(req: Request) {

        try {

            const journeys = await this.JornadaRepository.createQueryBuilder('jornada').select().where('jornada.pessoaId = :id', { id: req.params.idPessoa.toString() }).orderBy('jornada.id', 'DESC').getMany()

            saveRequestResponseLog('workingDay/getByIdPessoa', 'info', req.body, sendSuccess(journeys))
            return (sendSuccess(journeys))

        } catch (error) {

            saveRequestResponseLog('workingDay/getByIdPessoa', 'error', req.body, sendError(error))
            return error

        }

    }

    async deleteAll(req: Request) {

        try {

            await this.JornadaRepository.createQueryBuilder().delete().where('1 = 1').execute()

            saveRequestResponseLog('workingDay/delete', 'info', req.body, sendSuccess('Apagados'))
            return (sendSuccess('Apagados'))

        } catch (error) {

            saveRequestResponseLog('workingDay/delete', 'error', req.body, sendError(error))
            return error

        }

    }

    async deleteOne(req: Request) {

        try {

            const id = req.params.id
            const journey = await this.JornadaRepository.findOne(id)
            await this.JornadaRepository.delete(id)

            saveRequestResponseLog('workingDay/deleteOne', 'info', req.body, sendSuccess(journey))
            return (sendSuccess(journey))

        } catch (error) {

            saveRequestResponseLog('workingDay/deleteOne', 'error', req.body, sendError(error))
            return error

        }

    }

}
