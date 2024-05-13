import axios from 'axios'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getConnection, getRepository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Pessoa } from '../../../entities/Pessoa'
import { PessoaEndereco } from '../../../entities/PessoaEndereco'
import { PessoaEntrega } from '../../../entities/PessoaEntrega'
import { PessoaImagens } from '../../../entities/PessoaImagens'
import { PessoaPonto } from '../../../entities/PessoaPonto'
import { PessoaTema } from '../../../entities/PessoaTema'
import { PersonalInfoStepBody, SignUpStepBody } from '../../../interfaces/Pessoa/Steps'
import sendEmail from '../../../utils/email'
import { BadRequestException } from '../../../utils/errors/400/BadRequestException'
import { UnauthorizedException } from '../../../utils/errors/400/UnauthorizedException'
import { InternalServerException } from '../../../utils/errors/500/InternalServerException'
import { saveRequestResponseLog } from '../../../utils/loggers/requestResponseLogger'
import crypto from '../../../utils/security/crypto'
import { PainelController } from '../../Painel/PainelController'
import { generateEmail } from './scripts/constantes'

export class ActionsController {

    private PessoaRepositoryActions = getRepository(Pessoa)

    async login(request: Request) {

        try {

            const { email, password } = request.body

            const user = await this.PessoaRepositoryActions.findOne({ where: { email, senha: crypto(password) } })
            if (!user) throw new UnauthorizedException('Usuário não encontrado')

            const pessoa = await PainelController.methodGetPessoaById(user.id)

            saveRequestResponseLog('users/login', 'info', request.body, pessoa)
            return pessoa

        } catch (error) {

            saveRequestResponseLog('users/login', 'error', request.body, error)
            return error

        }

    }

    async loginSocial(request: Request) {

        try {

            const user = await this.PessoaRepositoryActions.findOne({ where: { referenciaRedeSocialId: request.body.token } }) as any
            if (!user) throw new UnauthorizedException('Usuário não encontrado')

            const pessoa = await PainelController.methodGetPessoaById(user.id)

            saveRequestResponseLog('users/login', 'info', request.body, pessoa)
            return pessoa

        } catch (error) {

            saveRequestResponseLog('users/loginSocial', 'error', request.body, error)
            return error

        }

    }

    async signUpStep(request: Request) {

        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {

            const body = request.body as SignUpStepBody

            const newPessoa = new Pessoa()
            newPessoa.email = body.email
            newPessoa.senha = crypto(body.password)
            newPessoa.nome = body.name
            newPessoa.referenciaRedeSocialId = body.token ?? uuidv4()
            newPessoa.dtCadastro = new Date()
            newPessoa.codigo = `${body.name.replace(' ', '').repeat(3).substring(0, 6)}${Math.random().toString(16).substring(2, 8)}`
            newPessoa.flagTipoPessoa = 'F'
            newPessoa.flagCookieAceito = false
            const saved = await queryRunner.manager.save(newPessoa)

            const newPessoaPontos = new PessoaPonto()
            newPessoaPontos.pessoaId = saved.id
            newPessoaPontos.dtCadastro = new Date()
            newPessoaPontos.dtAlteracao = new Date()
            await queryRunner.manager.save(newPessoaPontos)

            if (!(await sendEmail({ ...generateEmail(saved.uuid, saved.email) }))) throw new InternalServerException('Error sending email')

            await queryRunner.commitTransaction()
            const result = { ...saved, token: jwt.sign({ id: saved.id }, process.env.JWT_SECRET_KEY), }
            saveRequestResponseLog('users/signUpStep', 'info', request.body, result)
            return result

        } catch (error) {

            await queryRunner.rollbackTransaction()
            saveRequestResponseLog('users/signUpStep', 'error', request.body, error)
            return error

        }

    }

    async personalInfoStep(request: Request) {

        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {

            const body = request.body as PersonalInfoStepBody

            const pessoaToUpdate = await this.PessoaRepositoryActions.findOne({ where: { id: body.id } })
            if (!pessoaToUpdate) throw new BadRequestException('Usuário não encontrado')

            pessoaToUpdate.nome = body.name
            pessoaToUpdate.apelido = body.nickname
            pessoaToUpdate.dtNascimento = new Date(body.birthDay)
            pessoaToUpdate.flagSexo = body.genre
            pessoaToUpdate.nroDocumento = body.CPF
            pessoaToUpdate.telPrincipal = body.cellphone
            pessoaToUpdate.telSecundario = body.telephone
            pessoaToUpdate.dtAlteracao = new Date()
            const PersonSaved = await queryRunner.manager.save(pessoaToUpdate)

            const enderecoToSave = new PessoaEndereco()
            enderecoToSave.pessoaId = PersonSaved.id
            enderecoToSave.paisId = 1
            enderecoToSave.estadoId = 1
            enderecoToSave.uf = body.state
            enderecoToSave.nomeCidade = body.city
            enderecoToSave.tipoEnderecoId = 1
            enderecoToSave.cep = body.CEP
            enderecoToSave.logradouro = body.address
            enderecoToSave.numero = body.number
            enderecoToSave.complemento = body.complement
            enderecoToSave.dtAlteracao = new Date()
            enderecoToSave.dtCadastro = new Date()
            await queryRunner.manager.save(enderecoToSave)

            const imagemToSave = await getRepository(PessoaImagens).findOne({ where: { pessoaId: PersonSaved.id } }) ?? new PessoaImagens()
            imagemToSave.pessoaId = PersonSaved.id
            imagemToSave.imgAvatar = body.avatar
            await queryRunner.manager.save(imagemToSave)

            await queryRunner.commitTransaction()

            const pessoa = await PainelController.methodGetPessoaById(PersonSaved.id)
            saveRequestResponseLog('users/personalInfoStep', 'info', request.body, pessoa)
            return pessoa

        } catch (error) {

            await queryRunner.rollbackTransaction()
            saveRequestResponseLog('users/personalInfoStep', 'error', request.body, error)
            return error

        }

    }

    async validarEmail(request: Request, response: Response) {

        try {

            const { uuid } = request.params

            const pessoa = await this.PessoaRepositoryActions.findOne({ where: { uuid } })
            if (!pessoa) return response.send('<h1>Erro ao validar email</h1>')

            pessoa.dtEmailValidacao = new Date()
            await this.PessoaRepositoryActions.save(pessoa)

            saveRequestResponseLog('users/validarEmail', 'info', request.body, 'Email confirmado')
            response.send('<h1>Email validado</h1>')
            return { dontSend: 'do not res.send' }

        } catch (error) {

            saveRequestResponseLog('users/validarEmail', 'error', request.body, error)
            return error

        }

    }

    async validarCadastro(request: Request) {

        try {

            const body = request.body
            const pessoa = await this.PessoaRepositoryActions.findOne(Number(body.idPessoa))
            if (!pessoa) throw new InternalServerException('Usuário não encontrado')

            pessoa.dtValidacaoCadastro = new Date()
            pessoa.flagCadastroAprovado = body.flagCadastroAprovado
            await this.PessoaRepositoryActions.save(pessoa)

            saveRequestResponseLog('users/validarCadastro', 'info', request.body, { msg: 'Cadastro validado' })
            return ({ msg: 'Cadastro validado' })

        } catch (error) {

            saveRequestResponseLog('users/validarCadastro', 'error', request.body, error)
            return error

        }

    }

    async verificaValidacoes(request: Request) {

        try {

            const TbPessoa = await this.PessoaRepositoryActions.findOne(request.params.id)
            if (!request.params.id && !TbPessoa) throw new BadRequestException('Usuário não encontrado')

            const result = {
                emailValidado: Boolean(TbPessoa.dtEmailValidacao),
                cadastroAprovado: TbPessoa.flagCadastroAprovado,
                cookieAceito: TbPessoa.flagCookieAceito
            }

            saveRequestResponseLog('users/verificaValidacoes', 'info', request.body, result)
            return result

        } catch (error) {

            saveRequestResponseLog('users/verificaValidacoes', 'error', request.body, error)
            return error

        }

    }

    async saveThemeStep(request: Request) {

        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {

            const Pessoa = await this.PessoaRepositoryActions.findOne(request.body.idPessoa)
            if (!Pessoa) throw new BadRequestException('Usuário não encontrado')

            const PessoaTemas: PessoaTema[] = request.body.themes.map((theme: number) => {

                const newPessoaTema = new PessoaTema()
                const firstTheme = 0
                const lastTheme = 6
                if (theme < firstTheme || theme > lastTheme) throw new BadRequestException('Tema inválido')

                newPessoaTema.temaId = theme
                newPessoaTema.pessoaId = Pessoa.id
                return newPessoaTema

            })

            Pessoa.tamanhoCamisa = request.body.shirtSize
            await queryRunner.manager.save(Pessoa)
            await queryRunner.manager.save(PessoaTemas)

            await queryRunner.commitTransaction()
            const retornoPessoa = await PainelController.methodGetPessoaById(Pessoa.id)
            saveRequestResponseLog('users/saveThemeStep', 'info', request.body, (retornoPessoa))
            return retornoPessoa

        } catch (error) {

            await queryRunner.rollbackTransaction()
            saveRequestResponseLog('users/saveThemeStep', 'error', request.body, error)
            return error

        }

    }

    async alterarSenha(request: Request) {

        try {

            const pessoa = await this.PessoaRepositoryActions.findOne(request.body.idPessoa)
            if (!pessoa) throw new BadRequestException('Usuário não encontrado')

            if (pessoa.senha !== crypto(request.body.senhaAntiga)) throw new BadRequestException('Senha antiga incorreta')

            pessoa.senha = crypto(request.body.senhaNova)
            const saved = (await this.PessoaRepositoryActions.save(pessoa))
            saveRequestResponseLog('users/alterarSenha', 'info', request.body, saved)
            return saved

        } catch (error) {

            saveRequestResponseLog('users/alterarSenha', 'error', request.body, error)
            return error

        }

    }

    async enviarSMS(request: Request) {

        try {

            const number = request.body.number
            const msg = request.body.msg
            const endpoint = 'https://api.smsdev.com.br/v1/send'
            const params = `?number=${number}&msg=${msg}&key=${process.env.SMS_KEY}&type=9`

            const result = await axios(`${endpoint}${params}`)

            saveRequestResponseLog('users/enviarSMS', 'info', request.body, result.data)
            return result.data

        } catch (error) {

            saveRequestResponseLog('users/enviarSMS', 'error', request.body, error)
            return error

        }

    }

    async verificarSMS(request: Request) {

        try {

            const pessoaToSave = await this.PessoaRepositoryActions.findOne(request.body.idPessoa)
            if (!pessoaToSave) throw new BadRequestException('Usuário não encontrado')

            pessoaToSave.smsVerificado = true

            const saved = await this.PessoaRepositoryActions.save(pessoaToSave)
            const pessoa = await PainelController.methodGetPessoaById(saved.id)

            saveRequestResponseLog('users/smsVerificado', 'info', request.body, pessoa)
            return pessoa

        } catch (error) {

            saveRequestResponseLog('users/smsVerificado', 'error', request.body, error)
            return error

        }

    }

    async verificarCookies(request: Request) {

        try {

            const pessoaToSave = await this.PessoaRepositoryActions.findOne(request.body.idPessoa)
            if (!pessoaToSave && request.body.idPessoa) throw new BadRequestException('Usuário não encontrado')
            if (typeof request.body.flagCookieAceito !== 'boolean') throw new BadRequestException('Flag inválida')

            pessoaToSave.flagCookieAceito = request.body.flagCookieAceito

            const saved = await this.PessoaRepositoryActions.save(pessoaToSave)
            const pessoa = await PainelController.methodGetPessoaById(saved.id)

            saveRequestResponseLog('users/cookieVerificado', 'info', request.body, pessoa)
            return pessoa

        } catch (error) {

            saveRequestResponseLog('users/cookieVerificado', 'error', request.body, error)
            return error

        }

    }

    async salvarFiltros(request: Request) {

        try {

            const pessoaToSave = await this.PessoaRepositoryActions.findOne(request.body.idPessoa)
            if (!pessoaToSave && request.body.idPessoa) throw new BadRequestException('Usuário não encontrado')

            let pessoaEntregaToSave = await getRepository(PessoaEntrega).findOne({ pessoa: pessoaToSave })
            if (!pessoaEntregaToSave) {

                pessoaEntregaToSave = new PessoaEntrega()
                pessoaEntregaToSave.pessoa = pessoaToSave
                pessoaEntregaToSave.dtCadastro = new Date()

            }

            pessoaEntregaToSave.distancia = request.body.distancia
            pessoaEntregaToSave.dtAlteracao = new Date()
            pessoaEntregaToSave.quantidadePacotes = request.body.quantidadePacotes

            return await getRepository(PessoaEntrega).save(pessoaEntregaToSave)

        } catch (error) {

            return error

        }

    }

}
