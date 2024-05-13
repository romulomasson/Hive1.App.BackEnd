import { getConnection, getRepository } from 'typeorm'
import { LoginSemanal } from '../../../../entities/LoginSemanal'
import { Objetivo } from '../../../../entities/Objetivo'
import { PessoaObjetivoMissao } from '../../../../entities/PessoaObjetivoMissao'
import { BadRequestException } from '../../../../utils/errors/400/BadRequestException'
import { InternalServerException } from '../../../../utils/errors/500/InternalServerException'
import { v4 as uuidv4 } from 'uuid'
import { PessoaObjetivoMissaoLogica } from '../../../../entities/PessoaObjetivoMissaoLogica'
import { Pessoa } from '../../../../entities/Pessoa'

export async function concluirLoginSemanal(idPessoa: number, objetivo: Objetivo) {

    try {

        if (!objetivo) throw new InternalServerException('Objetivo Login Semanal não encontrado')

        const query = `
        SELECT id, numero_sequencia, dt_cadastro, dt_alteracao
        FROM logica.login_semanal
        WHERE id =
            (SELECT logica_id
            FROM logica.pessoa_objetivo_missao_logica
            WHERE pessoa_objetivo_missao_id =
                (SELECT id
                FROM pessoa_objetivo_missao
                WHERE objetivo_id = ${objetivo.id}
                    AND pessoa_id = ${idPessoa} ))`

        const ultimoLoginSemanal = (await getConnection().query(query))[0] as { 'id': number, 'numero_sequencia': number, 'dt_cadastro': Date, 'dt_alteracao': Date }
        console.log(ultimoLoginSemanal)

        if (ultimoLoginSemanal) {

            const dtOntem = new Date(new Date().getTime() - 8.64e+7).toLocaleDateString()
            const dtHoje = new Date().toLocaleDateString()
            const dtUltimoLogin = new Date(ultimoLoginSemanal['dt_alteracao']).toLocaleDateString()

            const flagOntem = dtUltimoLogin === dtOntem
            const flagHoje = dtUltimoLogin === dtHoje

            if (flagHoje) throw new BadRequestException('Você já concluiu o login hoje')

            if (flagOntem && ultimoLoginSemanal['numero_sequencia'] < 7) {

                console.log('Continuou a sequencia')
                return await getRepository(LoginSemanal).update(ultimoLoginSemanal['id'], { numeroSequencia: ultimoLoginSemanal['numero_sequencia'] + 1, dtAlteracao: new Date() } as any)

            }

            console.log('Quebrou a sequencia ou completou uma de 7 dias, nova sequencia é criada')
            await getRepository(LoginSemanal).update(ultimoLoginSemanal['id'], { flagAtivo: false } as any)

            const loginSemanal = new LoginSemanal()
            loginSemanal.uuidSequencia = uuidv4()
            loginSemanal.numeroSequencia = 1
            loginSemanal.flagAtivo = true
            loginSemanal.dtAlteracao = new Date()
            loginSemanal.dtCadastro = new Date()
            const novaLogica = await getRepository(LoginSemanal).save(loginSemanal)

            const pessoaObjetivoMissao = (await getRepository(PessoaObjetivoMissao).findOne({ where: { objetivo: objetivo.id, pessoa: idPessoa } }))

            return await getRepository(PessoaObjetivoMissaoLogica).update(pessoaObjetivoMissao.id, { logicaId: novaLogica.id, dtAlteracao: new Date() })

        }

        console.log('Nunca houve sequencia, nova sequencia é criada')
        const loginSemanal = new LoginSemanal()
        loginSemanal.uuidSequencia = uuidv4()
        loginSemanal.numeroSequencia = 1
        loginSemanal.flagAtivo = true
        loginSemanal.dtCadastro = new Date()
        loginSemanal.dtAlteracao = new Date()
        const novaLogica = await getRepository(LoginSemanal).save(loginSemanal)

        let pessoaObjetivoMissao = (await getRepository(PessoaObjetivoMissao).findOne({ where: { objetivo: objetivo.id, pessoa: idPessoa } }))

        if (!pessoaObjetivoMissao) {

            const novaPessoaObjetivoMissao = new PessoaObjetivoMissao()
            novaPessoaObjetivoMissao.pessoa = await getRepository(Pessoa).findOne(idPessoa)
            novaPessoaObjetivoMissao.objetivo = objetivo
            novaPessoaObjetivoMissao.dtCadastro = new Date()
            novaPessoaObjetivoMissao.dtAlteracao = new Date()
            pessoaObjetivoMissao = await getRepository(PessoaObjetivoMissao).save(novaPessoaObjetivoMissao)

        }

        const novaPessoaObjetivoMissaoLogica = new PessoaObjetivoMissaoLogica()
        novaPessoaObjetivoMissaoLogica.pessoaObjetivoMissao = pessoaObjetivoMissao
        novaPessoaObjetivoMissaoLogica.logicaId = novaLogica.id
        novaPessoaObjetivoMissaoLogica.entidade = 'login_semanal'
        novaPessoaObjetivoMissaoLogica.dtCadastro = new Date()
        novaPessoaObjetivoMissaoLogica.dtAlteracao = new Date()
        return await getRepository(PessoaObjetivoMissaoLogica).save(novaPessoaObjetivoMissaoLogica)

    } catch (error) {

        return error

    }

}
