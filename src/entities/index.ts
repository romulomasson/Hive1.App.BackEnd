import { Pessoa } from './Pessoa'
import { PessoaStatus } from './PessoaStatus'
import { PessoaEndereco } from './PessoaEndereco'
import { TipoEndereco } from './TipoEndereco'
import { PessoaContaBancaria } from './PessoaContaBancaria'
import { PessoaContato } from './PessoaContato'
import { Banco } from './Banco'
import { TipoContato } from './TipoContato'
import { PessoaHistorico } from './PessoaHistorico'
import { TipoHistorico } from './TipoHistorico'
import { PessoaJornadaTrabalho } from './PessoaJornadaTrabalho'
import { Notificacao } from './Notificacao'
import { NotificacaoLida } from './NotificacaoLida'
import { PessoaTipo } from './PessoaTipo'
import { PoliticaPrivacidade } from './PoliticaPrivacidade'
import { PoliticaPrivacidadeAceite } from './PoliticaPrivacidadeAceite'
import { TipoDocumento } from './TipoDocumento'
import { TipoRedeSocial } from './TipoRedeSocial'
import { PessoaImagens } from './PessoaImagens'
import { Faq } from './Faq'
import { TipoTema } from './TipoTema'
import { PessoaTema } from './PessoaTema'
import { PessoaConvite } from './PessoaConvite'
import { PessoaPonto } from './PessoaPonto'
import { SistemaMeta } from './SistemaMeta'
import { OldMissao } from './OldMissao'
import { PessoaObjetivoMissao } from './PessoaObjetivoMissao'
import { Objetivo } from './Objetivo'
import { ObjetivoMissao } from './ObjetivoMissao'
import { LoginSemanal } from './LoginSemanal'
import { IndiqueSemanal } from './IndiqueSemanal'
import { PessoaObjetivoMissaoLogica } from './PessoaObjetivoMissaoLogica'
import { CompartilheSemanal } from './CompartilheSemanal'
import { Parceiro } from './Parceiro'
import { ParceiroProduto } from './ParceiroProduto'
import { ParceiroProdutoImagem } from './ParceiroProdutoImagem'
import { PessoaEntrega } from './PessoaEntrega'
import { Entrega } from './Entrega'
import { Desafio } from './Desafio'

export const Tables = {
    *[Symbol.iterator]() {

        yield Pessoa
        yield PessoaStatus
        yield PessoaEndereco
        yield TipoEndereco
        yield PessoaContaBancaria
        yield PessoaContato
        yield Banco
        yield TipoContato
        yield PessoaHistorico
        yield TipoHistorico
        yield PessoaJornadaTrabalho
        yield Notificacao
        yield NotificacaoLida
        yield PessoaTipo
        yield PoliticaPrivacidade
        yield PoliticaPrivacidadeAceite
        yield TipoDocumento
        yield TipoRedeSocial
        yield PessoaImagens
        yield TipoTema
        yield PessoaTema
        yield PessoaConvite
        yield Faq
        yield PessoaPonto
        yield SistemaMeta
        yield OldMissao
        yield Objetivo
        yield ObjetivoMissao
        yield PessoaObjetivoMissao
        yield LoginSemanal
        yield IndiqueSemanal
        yield PessoaObjetivoMissaoLogica
        yield CompartilheSemanal
        yield Parceiro
        yield ParceiroProduto
        yield ParceiroProdutoImagem
        yield PessoaEntrega
        yield Entrega
        yield Desafio

    }
}
