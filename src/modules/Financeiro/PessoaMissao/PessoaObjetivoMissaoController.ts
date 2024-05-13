import { Request } from 'express'
import { getRepository } from 'typeorm'
import { Objetivo } from '../../../entities/Objetivo'
import { ObjetivoMissao } from '../../../entities/ObjetivoMissao'
import { Pessoa } from '../../../entities/Pessoa'
import { PessoaObjetivoMissao } from '../../../entities/PessoaObjetivoMissao'
import { BadRequestException } from '../../../utils/errors/400/BadRequestException'
import { PainelController } from '../../Painel/PainelController'
import { concluirCompartilheSemanal } from './ConcluirMissao/CompartilheSemanal'
import { concluirIndiqueSemanal } from './ConcluirMissao/IndiqueSemanal'
import { concluirLoginSemanal } from './ConcluirMissao/LoginSemanal'
import { VerificaObjetivosSemanal } from './VerificaObjetivo/VerificaObjetivosSemanal'
import { VerificaObjetivosUnicos } from './VerificaObjetivo/VerificaObjetivosUnico'

export class PessoaObjetivoMissaoController {

    private defaultRepository = getRepository(PessoaObjetivoMissao)
    private verificaObjetivosUnicos = new VerificaObjetivosUnicos()
    private verificaObjetivosSemanal = new VerificaObjetivosSemanal()

    async userCompleteMission(req: Request) {

        try {

            const pessoa = await getRepository(Pessoa).findOne({ where: { id: req.body.idPessoa } })
            if (!pessoa) throw new BadRequestException('Pessoa não encontrada')

            if (req.body.idObjetivo === 7) {

                return concluirLoginSemanal(pessoa.id, await getRepository(Objetivo).findOne(req.body.idObjetivo))

            }

            if (req.body.idObjetivo === 8) {

                return concluirIndiqueSemanal(pessoa.id, await getRepository(Objetivo).findOne(req.body.idObjetivo))

            }

            if (req.body.idObjetivo === 11) {

                return concluirCompartilheSemanal(pessoa.id, await getRepository(Objetivo).findOne(req.body.idObjetivo))

            }

            const objetivoMissao = await getRepository(ObjetivoMissao).findOne({ where: { id: req.body.idObjetivoMissao }, relations: ['objetivo'] })
            if (!objetivoMissao) throw new BadRequestException('Objetivo não encontrado')

            const pessoaObjetivo = new PessoaObjetivoMissao()
            pessoaObjetivo.pessoa = pessoa
            pessoaObjetivo.missao = objetivoMissao
            pessoaObjetivo.dtConclusao = new Date()

            return await this.defaultRepository.save(pessoaObjetivo)

        } catch (error) {

            return error

        }

    }

    async userMissionsStatus(req: Request) {

        try {

            const completePessoaInfo = await PainelController.methodGetPessoaById(req.params.id)
            if (!completePessoaInfo) throw new BadRequestException('Pessoa não encontrada')

            const todasFixas = await getRepository(Objetivo).find({ where: { fixo: true }, relations: ['objetivoMissaos'] })
            const [ID_OBJETIVO_CADASTRO, ID_OBJETIVO_PRIMEIRO_CONVITE, ID_OBJETIVO_PRIMEIRA_DOACAO] = [4, 5, 6]
            const [ID_OBJETIVO_LOGIN, ID_OBJETIVO_INDIQUE, ID_OBJETIVO_COMPRE_DE_PARCEIRO, ID_OBJETIVO_UTILIZAR_PONTOS] = [7, 8, 9, 10]
            const ID_OBJETIVO_COMPARTILHAR = 11

            return [
                this.verificaObjetivosUnicos.cadastro(completePessoaInfo, todasFixas.find((objetivo: Objetivo) => objetivo.id === ID_OBJETIVO_CADASTRO)),
                await this.verificaObjetivosUnicos.primeiroConvite(completePessoaInfo, todasFixas.find((objetivo: Objetivo) => objetivo.id === ID_OBJETIVO_PRIMEIRO_CONVITE)),
                this.verificaObjetivosUnicos.primeiraDoacao(todasFixas.find((objetivo: Objetivo) => objetivo.id === ID_OBJETIVO_PRIMEIRA_DOACAO)),
                await this.verificaObjetivosSemanal.loginSemanal(completePessoaInfo, todasFixas.find((objetivo: Objetivo) => objetivo.id === ID_OBJETIVO_LOGIN)),
                await this.verificaObjetivosSemanal.indiqueSemanal(completePessoaInfo, todasFixas.find((objetivo: Objetivo) => objetivo.id === ID_OBJETIVO_INDIQUE)),
                this.verificaObjetivosUnicos.comprarDeParceiro(todasFixas.find((objetivo: Objetivo) => objetivo.id === ID_OBJETIVO_COMPRE_DE_PARCEIRO)),
                this.verificaObjetivosUnicos.utilizarPontos(todasFixas.find((objetivo: Objetivo) => objetivo.id === ID_OBJETIVO_UTILIZAR_PONTOS)),
                await this.verificaObjetivosSemanal.compartilheSemanal(completePessoaInfo, todasFixas.find((objetivo: Objetivo) => objetivo.id === ID_OBJETIVO_COMPARTILHAR)),
            ]

        } catch (error) {

            return error

        }

    }

}
