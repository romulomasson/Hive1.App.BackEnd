import { getConnection, getRepository } from 'typeorm'
import moment from 'moment'
import { CompartilheSemanal } from '../../../../entities/CompartilheSemanal'
import { PessoaObjetivoMissao } from '../../../../entities/PessoaObjetivoMissao'
import { PessoaObjetivoMissaoLogica } from '../../../../entities/PessoaObjetivoMissaoLogica'
import { Pessoa } from '../../../../entities/Pessoa'
import { Objetivo } from '../../../../entities/Objetivo'

export async function concluirCompartilheSemanal(idPessoa: number, objetivo: Objetivo) {

    const query = `
    SELECT id, dt_inicio, dt_fim, dt_cadastro, dt_alteracao, quantidade_compartilhamentos
        FROM logica.compartilhe_semanal
        WHERE id =
            (SELECT logica_id
            FROM logica.pessoa_objetivo_missao_logica
            WHERE pessoa_objetivo_missao_id =
                (SELECT id
                FROM pessoa_objetivo_missao
                WHERE objetivo_id = ${objetivo.id}
                    AND pessoa_id = ${idPessoa} )
                    AND entidade = 'compartilhe_semanal')`

    const statusCompartilhamentosDaSemana = (await getConnection().query(query))[0] as { 'id': number, 'dt_inicio': Date, 'dt_fim': Date, 'dt_cadastro': Date, 'dt_alteracao': Date, 'quantidade_compartilhamentos': number }

    if (statusCompartilhamentosDaSemana && statusCompartilhamentosDaSemana.dt_fim > new Date()) {

        console.log('ja existe uma semana para compartilhar e ela ainda não acabou, semana sendo atualizada')
        return getRepository(CompartilheSemanal).update(statusCompartilhamentosDaSemana.id, { quantidadeCompartilhamentos: statusCompartilhamentosDaSemana.quantidade_compartilhamentos + 1 })

    }

    if (statusCompartilhamentosDaSemana && statusCompartilhamentosDaSemana.dt_fim < new Date()) {

        console.log('ja existe uma semana para compartilhar e ela ja passou, criando uma nova')
        const novaSemana = await criarNovaSemana()

        await getRepository(CompartilheSemanal).update(statusCompartilhamentosDaSemana.id, { flagAtivo: false })

        const pessoaObjetivoMissaoLogica = await getRepository(PessoaObjetivoMissaoLogica).findOne({ where: { logicaId: statusCompartilhamentosDaSemana.id, entidade: 'compartilhe_semanal' } })
        pessoaObjetivoMissaoLogica.logicaId = novaSemana.id
        pessoaObjetivoMissaoLogica.dtAlteracao = new Date()
        return await getRepository(PessoaObjetivoMissaoLogica).save(pessoaObjetivoMissaoLogica)

    }

    return await registrarUsuarioNaMissaoConvidar(idPessoa, objetivo)

}

async function registrarUsuarioNaMissaoConvidar(idPessoa: number, objetivo: Objetivo) {

    console.log('Nunca houve nenhuma semana para compartilhar, nova semana é criada')
    const novaSemana = await criarNovaSemana()

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
    novaPessoaObjetivoMissaoLogica.logicaId = novaSemana.id
    novaPessoaObjetivoMissaoLogica.entidade = 'compartilhe_semanal'
    novaPessoaObjetivoMissaoLogica.dtCadastro = new Date()
    novaPessoaObjetivoMissaoLogica.dtAlteracao = new Date()
    return await getRepository(PessoaObjetivoMissaoLogica).save(novaPessoaObjetivoMissaoLogica)

}

async function criarNovaSemana(quantidadeCompartilhamentos = 1) {

    const novaSemanaParaConvidar = new CompartilheSemanal()
    novaSemanaParaConvidar.dtInicio = new Date()
    novaSemanaParaConvidar.dtFim = moment().add(7, 'days').toDate()
    novaSemanaParaConvidar.quantidadeCompartilhamentos = quantidadeCompartilhamentos
    novaSemanaParaConvidar.dtCadastro = new Date()
    novaSemanaParaConvidar.dtAlteracao = new Date()
    novaSemanaParaConvidar.flagAtivo = true
    return await getRepository(CompartilheSemanal).save(novaSemanaParaConvidar)

}

// Caso de teste:
// apagar todos os dados da tabela pessoa_objetivo_missao_logica onde id pessoa = 153 e entidade = indique_mensal
// apagar todos os convites na tabela pessoa_convite
// apagar todos os dados na tabela compartilhe_semanal
// bater no endpoint de concluir missao de indique semanal simulando um novo cadastro no app
// verificando se deu log dizendo que nunca houve semana e uma nova foi criada
// convidar alguem (id 19)
// bater novamente no endpoint de concluir missao de indique semanal
// verificando se deu log dizendo que há uma semana e que a semana foi atualizada
// mudar data no banco na tabela indique semanal no campo dt_fim para um dia anterior e dt inicio para dois dias anteriores
// bater novamente no endpoint de concluir missao de indique semanal
// verificar se percebeu que ja passou uma semana e criar uma nova
// convidar outra pessoa (id 137)
// verificar se deu log dizendo que há uma semana e que a semana foi atualizada
