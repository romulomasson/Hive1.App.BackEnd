export type TipoConta = 'corrente' | 'poupanca'
export type Instituicao = 'banco do brasil' | 'bradesco' | 'caixa' | 'itaú' | 'santander' | 'sicredi' | 'banco inter' | 'nubank';

export interface CreateFinancialInfoBody {

    idPessoa: number
    tipoConta: TipoConta
    idBanco: number
    agencia: string
    conta: string
    pix?: string
    razaoSocial: string
    cnpj: string
    nomeFantasia: string

}

