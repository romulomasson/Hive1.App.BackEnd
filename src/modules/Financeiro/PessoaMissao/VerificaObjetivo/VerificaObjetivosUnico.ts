import { getManager } from 'typeorm'
import { Objetivo } from '../../../../entities/Objetivo'
import { PessoaRetorno } from '../../../../interfaces/Pessoa/PessoaRetorno'
import { InternalServerException } from '../../../../utils/errors/500/InternalServerException'
import { generateCadastroValidation } from '../constantes'

export class VerificaObjetivosUnicos {

    cadastro(pessoa: PessoaRetorno, objetivo: Objetivo) {

        if (!objetivo) throw new InternalServerException('Objetivo Cadastro não encontrado')

        const objetivoCadastroValidacao = generateCadastroValidation(pessoa)
        let quantidadeMissoesConcluidas = 0

        objetivo.objetivoMissaos = objetivo.objetivoMissaos.map(missao => {

            const { condition } = objetivoCadastroValidacao.find(validation => validation.descricao === missao.descricao)

            if (condition) {

                quantidadeMissoesConcluidas++
                return { ...missao, flagConcluida: true }

            }

            return { ...missao, flagConcluida: false }

        })

        return { ...objetivo, porcentagemConcluida: ((quantidadeMissoesConcluidas / objetivo.objetivoMissaos.length) * 100).toFixed(0) }

    }

    async primeiroConvite(pessoa: PessoaRetorno, objetivo: Objetivo) {

        if (!objetivo) throw new InternalServerException('Objetivo Primeiro Convite não encontrado')

        let quantidadeMissoesConcluidas = 0

        const query = `SELECT pessoa.flag_cadastro_aprovado FROM pessoa_convite INNER JOIN pessoa on pessoa.id = pessoa_convite.pessoa_id WHERE pessoa_id = ${pessoa.id}`
        const convidadosStatusCadastroAprovado = await getManager().query(query) as { flag_cadastro_aprovado: boolean }[]

        objetivo.objetivoMissaos = objetivo.objetivoMissaos.map(missao => {

            if (missao.descricao === 'Compartilhar o código') {

                quantidadeMissoesConcluidas++
                return { ...missao, flagConcluida: convidadosStatusCadastroAprovado.length > 0 }

            }

            if (missao.descricao === 'Novo hiver aprovado') {

                if (convidadosStatusCadastroAprovado.length > 0 && convidadosStatusCadastroAprovado.some(convidadoStatus => convidadoStatus.flag_cadastro_aprovado)) {

                    quantidadeMissoesConcluidas++
                    return { ...missao, flagConcluida: true }

                }

            }

            return { ...missao, flagConcluida: false }

        })

        return { ...objetivo, porcentagemConcluida: ((quantidadeMissoesConcluidas / objetivo.objetivoMissaos.length) * 100).toFixed(0) }

    }

    primeiraDoacao(objetivo: Objetivo) {

        if (!objetivo) throw new InternalServerException('Objetivo Primeira Doação não encontrado')

        const quantidadeMissoesConcluidas = 0

        objetivo.objetivoMissaos = objetivo.objetivoMissaos.map(missao => {

            if (missao.descricao === 'Realizado doação de pontos') {

                return { ...missao, flagConcluida: false }

            }

            return { ...missao, flagConcluida: false }

        })

        return { ...objetivo, porcentagemConcluida: ((quantidadeMissoesConcluidas / objetivo.objetivoMissaos.length) * 100).toFixed(0) }

    }

    comprarDeParceiro(objetivo: Objetivo) {

        if (!objetivo) throw new InternalServerException('Objetivo Primeira compra de parceiro não encontrado')

        const quantidadeMissoesConcluidas = 0

        objetivo.objetivoMissaos = objetivo.objetivoMissaos.map(missao => {

            if (missao.descricao === 'Realize sua primeira compra em nossos parceiros') {

                return { ...missao, flagConcluida: false }

            }

            return { ...missao, flagConcluida: false }

        })

        return { ...objetivo, porcentagemConcluida: ((quantidadeMissoesConcluidas / objetivo.objetivoMissaos.length) * 100).toFixed(0) }

    }

    utilizarPontos(objetivo: Objetivo) {

        if (!objetivo) throw new InternalServerException('Objetivo Primeira Utilização de pontos não encontrada')

        const quantidadeMissoesConcluidas = 0

        objetivo.objetivoMissaos = objetivo.objetivoMissaos.map(missao => {

            if (missao.descricao === 'Adquira produtos fantasticos com seus pontos') {

                return { ...missao, flagConcluida: false }

            }

            return { ...missao, flagConcluida: false }

        })

        return { ...objetivo, porcentagemConcluida: ((quantidadeMissoesConcluidas / objetivo.objetivoMissaos.length) * 100).toFixed(0) }

    }

}
