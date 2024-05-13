import { Pessoa } from '../../../../src/entities/Pessoa'
import { faker } from '@faker-js/faker'
import crypto from '../../../../src/utils/crypto'

export function generatePessoa() {

    const pessoa = new Pessoa()

    pessoa.nome = faker.name.findName()
    pessoa.email = 'marcosaquiuqui@gmail.com'
    pessoa.senha = crypto('123456')
    pessoa.referenciaRedeSocialId = 'A'
    pessoa.dtCadastro = new Date()
    pessoa.codigo = 'abcdef123456'
    pessoa.flagTipoPessoa = 'f'

    return pessoa

}
