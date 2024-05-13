import { getConnection, getRepository } from 'typeorm'
import { Objetivo } from '../../../../entities/Objetivo'
import { PessoaRetorno } from '../../../../interfaces/Pessoa/PessoaRetorno'
import { InternalServerException } from '../../../../utils/errors/500/InternalServerException'
import { concluirIndiqueSemanal } from '../ConcluirMissao/IndiqueSemanal'
import { concluirLoginSemanal } from '../ConcluirMissao/LoginSemanal'

export class VerificaObjetivosSemanal {

    async loginSemanal(pessoa: PessoaRetorno, objetivo: Objetivo) {

        if (!objetivo) throw new InternalServerException('Objetivo Login Semanal não encontrado')

        await concluirLoginSemanal(pessoa.id, await getRepository(Objetivo).findOne(objetivo.id))

        const query = `
        SELECT numero_sequencia
        FROM logica.login_semanal
        WHERE id =
            (SELECT logica_id
            FROM logica.pessoa_objetivo_missao_logica
            WHERE pessoa_objetivo_missao_id =
                (SELECT id
                FROM pessoa_objetivo_missao
                WHERE objetivo_id = ${objetivo.id}
                    AND pessoa_id = ${pessoa.id} )
                    AND entidade = 'login_semanal')`

        const ultimoLoginSemanal = (await getConnection().query(query))[0] as { 'numero_sequencia': number }

        objetivo.objetivoMissaos = objetivo.objetivoMissaos.map((missao, index) => {

            return { ...missao, flagConcluida: index < ultimoLoginSemanal['numero_sequencia'] }

        })

        return { ...objetivo, porcentagemConcluida: ((ultimoLoginSemanal['numero_sequencia'] / objetivo.objetivoMissaos.length) * 100).toFixed(0) }

    }

    async indiqueSemanal(pessoa: PessoaRetorno, objetivo: Objetivo) {

        if (!objetivo) throw new InternalServerException('Objetivo Indique Semanal não encontrado')

        await concluirIndiqueSemanal(pessoa.id, await getRepository(Objetivo).findOne(objetivo.id))

        const query = `
        SELECT quantidade_indicados
        FROM logica.indique_semanal
        WHERE id =
            (SELECT logica_id
            FROM logica.pessoa_objetivo_missao_logica
            WHERE pessoa_objetivo_missao_id =
                (SELECT id
                FROM pessoa_objetivo_missao
                WHERE objetivo_id = ${objetivo.id}
                    AND pessoa_id = ${pessoa.id} )
                    AND entidade = 'indique_semanal')`

        const statusIndiqueSemanal = (await getConnection().query(query))[0] as { 'quantidade_indicados': number }

        const statusMissoes = [
            { missao: objetivo.objetivoMissaos[0], flagConcluida: statusIndiqueSemanal['quantidade_indicados'] > 0 },
            { missao: objetivo.objetivoMissaos[1], flagConcluida: statusIndiqueSemanal['quantidade_indicados'] > 2 },
            { missao: objetivo.objetivoMissaos[2], flagConcluida: statusIndiqueSemanal['quantidade_indicados'] > 4 },
        ]

        objetivo.objetivoMissaos = objetivo.objetivoMissaos.map((missao, index) => {

            return { ...missao, flagConcluida: statusMissoes[index].flagConcluida }

        })

        return { ...objetivo, porcentagemConcluida: ((statusMissoes.filter((missao) => missao.flagConcluida).length / objetivo.objetivoMissaos.length) * 100).toFixed(0) }

    }

    async compartilheSemanal(pessoa: PessoaRetorno, objetivo: Objetivo) {

        if (!objetivo) throw new InternalServerException('Objetivo Compartilhe Semanal não encontrado')

        const query = `
    SELECT quantidade_compartilhamentos
        FROM logica.compartilhe_semanal
        WHERE id =
            (SELECT logica_id
            FROM logica.pessoa_objetivo_missao_logica
            WHERE pessoa_objetivo_missao_id =
                (SELECT id
                FROM pessoa_objetivo_missao
                WHERE objetivo_id = ${objetivo.id}
                    AND pessoa_id = ${pessoa.id} )
                    AND entidade = 'compartilhe_semanal')`

        const statusCompartilhamentosSemanal = (await getConnection().query(query))[0] as { 'quantidade_compartilhamentos': number }

        if (statusCompartilhamentosSemanal){

            objetivo.objetivoMissaos = objetivo.objetivoMissaos.map((missao) => {

                return { ...missao, flagConcluida: statusCompartilhamentosSemanal.quantidade_compartilhamentos > 0 }

            })

            return { ...objetivo, porcentagemConcluida: ((statusCompartilhamentosSemanal.quantidade_compartilhamentos > 0 ? 1 : 0 / objetivo.objetivoMissaos.length) * 100).toFixed(0) }

        }

        return { ...objetivo, porcentagemConcluida: 0 }

    }

}
