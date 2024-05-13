import { getManager, getRepository } from 'typeorm'
import { Pessoa } from '../../entities/Pessoa'
import { PessoaContaBancaria } from '../../entities/PessoaContaBancaria'
import { PessoaEndereco } from '../../entities/PessoaEndereco'
import { PessoaImagens } from '../../entities/PessoaImagens'
import { PessoaJornadaTrabalho } from '../../entities/PessoaJornadaTrabalho'
import { PessoaPonto } from '../../entities/PessoaPonto'
import { PessoaTema } from '../../entities/PessoaTema'
import jwt from 'jsonwebtoken'
import { PessoaRetorno } from '../../interfaces/Pessoa/PessoaRetorno'
import { BadRequestException } from '../../utils/errors/400/BadRequestException'
import { Request } from 'express'
import { cadastroBasico, cadastroEndereco, cadastroFinanceiro, cadastroImagens, diasSemana } from './constantes'
import { PessoaEntrega } from '../../entities/PessoaEntrega'

export class PainelController {

    async getPessoas() {

        try {

            // const LIMIT = 10
            // const OFFSET = (Number(req.params.page) - 1) * LIMIT

            // const pessoas = await getManager().query(`select *, (SELECT COUNT(*) from pessoa) as paginas from pessoa WHERE flag_tipo_pessoa = 'F' LIMIT ${LIMIT} OFFSET ${OFFSET}`) as Pessoa[]
            const pessoas = await getManager().query('select *, (SELECT COUNT(*) from pessoa) as paginas from pessoa WHERE flag_tipo_pessoa = \'F\'') as Pessoa[]
            const results: PessoaRetorno[] = await Promise.all(pessoas.map(async (pessoa): Promise<PessoaRetorno> => (await PainelController.methodGetPessoaById(pessoa.id))))

            results.filter(pessoa => pessoa.flagCadastroAprovado === null)
            return results

        } catch (error) {

            return error

        }

    }

    async getPessoaById(req: Request) {

        try {

            const pessoa = await PainelController.methodGetPessoaById(req.params.id)
            return { pessoa, campos: { cadastroBasico, cadastroEndereco, cadastroFinanceiro, cadastroImagens }, diasSemana }

        } catch (error) {

            return error

        }

    }

    public static async methodGetPessoaById(idPessoa: number | string) {

        const pessoa = await getRepository(Pessoa).findOne({ id: Number(idPessoa) }) as any
        if (!pessoa) throw new BadRequestException('Pessoa não encontrada')

        return {
            ...pessoa,
            token: jwt.sign({ id: idPessoa }, process.env.JWT_SECRET_KEY),
            endereco: await getRepository(PessoaEndereco).findOne({ where: { pessoaId: pessoa.id } }),
            jornada: await getRepository(PessoaJornadaTrabalho).find({ where: { pessoaId: pessoa.id } }),
            conta: await getRepository(PessoaContaBancaria).findOne({ where: { pessoaId: pessoa.id } }),
            imagens: await getRepository(PessoaImagens).findOne({ where: { pessoaId: pessoa.id } }),
            temas: await getRepository(PessoaTema).find({ where: { pessoaId: pessoa.id } }),
            pontos: await getRepository(PessoaPonto).findOne({ where: { pessoaId: pessoa.id } }),
            filtros: await getRepository(PessoaEntrega).findOne({ where: { pessoa: { id: pessoa.id } } }),
        } as PessoaRetorno

    }

    async validatePessoa(req: Request) {

        try {

            const pessoa = await getRepository(Pessoa).findOne(Number(req.body.id))
            if (!pessoa) throw new BadRequestException('Pessoa não encontrada')

            pessoa.flagCadastroAprovado = req.body.flagCadastroAprovado
            pessoa.motivoCadastroNegado = req.body.motivoCadastroNegado
            pessoa.descricaoMotivoCadastroNegado = req.body.descricaoMotivoCadastroNegado
            pessoa.dtValidacaoCadastro = new Date()
            await getRepository(Pessoa).save(pessoa)

            return { msg: 'Cadastro validado' }

        } catch (error) {

            return error

        }

    }

}
