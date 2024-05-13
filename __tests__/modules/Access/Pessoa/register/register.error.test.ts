import request from 'supertest'
import { getManager } from 'typeorm'
import connection from '../../../../../src/connection'
import { Pessoa } from '../../../../../src/entities/Pessoa'
import app from '../../../../../src/app'
import { standardReturn } from '../../../../constants/standardReturn'
import { generatePessoa } from '../factory'
import { faker } from '@faker-js/faker'

describe('user register errors', () => {

    let savedUser: Pessoa

    beforeAll(async () => {

        await connection.test_create()
        savedUser = await getManager().save(generatePessoa())

    })

    afterAll(async () => {

        await connection.clear('DELETE')
        await connection.close()

    })

    const checkReturn = (response: any) => {

        expect(Object.keys(response.body)).toStrictEqual(standardReturn)
        expect(response.body.flagErro).toBe(true)
        expect(response.body.listaMensagens.length).toBeGreaterThan(0)

    }

    describe('should not signUp', () => {

        it('should not signup with already registered email', async () => {

            const result = await request(app).post('/users/signupStep').send({
                email: 'marcosaquiuqui@gmail.com',
                name: faker.name.findName(),
                password: faker.internet.password(),
            }).expect(200)
            checkReturn(result)

        })

        it('should not signup without email', async () => {

            const result = await request(app).post('/users/signupStep').send({
                name: faker.name.findName(),
                password: faker.internet.password(),
            }).expect(200)
            checkReturn(result)

        })

        it('should not signup without email and name', async () => {

            const result = await request(app).post('/users/signupStep').send({
                password: faker.internet.password(),
                token: 'A'
            }).expect(200)
            checkReturn(result)

        })

        it('should not signup without password', async () => {

            const result = await request(app).post('/users/signupStep').send({
                email: 'luisgustavofeitoza2@gmail.com',
                name: faker.name.findName(),
                token: 'A'
            }).expect(200)
            checkReturn(result)

        })

    })

    describe('should not save basic info step', () => {

        it('should not basic info step without id', async () => {

            const result = await request(app).post('/users/personalInfoStep').send({
                CEP: '03805010',
                CPF: '50576013854',
                address: 'Rua Cerro de Mateus Simoes',
                avatar: 'AvatarTeste',
                birthDay: '2003-08-20T23:30:00.000Z',
                cellphone: '11945620297',
                city: 'São Paulo',
                complement: '',
                genre: 'M',
                name: 'Luis Info Step',
                nickname: 'LG',
                number: '563',
                state: 'SP',
                telephone: '1120513885'
            }).expect(200)
            checkReturn(result)

        })

        it('should not basic info step with false id', async () => {

            const result = await request(app).post('/users/personalInfoStep').send({
                id: 9999,
                CEP: '03805010',
                CPF: '50576013854',
                address: 'Rua Cerro de Mateus Simoes',
                avatar: 'AvatarTeste',
                birthDay: '2003-08-20T23:30:00.000Z',
                cellphone: '11945620297',
                city: 'São Paulo',
                complement: '',
                genre: 'M',
                name: 'Luis Info Step',
                nickname: 'LG',
                number: '563',
                state: 'SP',
                telephone: '1120513885'
            }).expect(200)
            checkReturn(result)

        })

        it('should not basic info step without address', async () => {

            const result = await request(app).post('/users/personalInfoStep').send({
                id: savedUser.id,
                CEP: '03805010',
                CPF: '50576013854',
                avatar: 'AvatarTeste',
                birthDay: '2003-08-20T23:30:00.000Z',
                cellphone: '11945620297',
                city: 'São Paulo',
                complement: '',
                genre: 'M',
                name: 'Luis Info Step',
                nickname: 'LG',
                number: '563',
                state: 'SP',
                telephone: '1120513885'
            }).expect(200)
            checkReturn(result)

        })

        it('should not basic info step without genre', async () => {

            const result = await request(app).post('/users/personalInfoStep').send({
                id: savedUser.id,
                CEP: '03805010',
                CPF: '50576013854',
                avatar: 'AvatarTeste',
                birthDay: '2003-08-20T23:30:00.000Z',
                cellphone: '11945620297',
                city: 'São Paulo',
                complement: '',
                address: 'Rua Cerro de Mateus Simoes',
                name: 'Luis Info Step',
                nickname: 'LG',
                number: '563',
                state: 'SP',
                telephone: '1120513885'
            }).expect(200)
            checkReturn(result)

        })

    })

    describe('should not save working day step', () => {

        it('working day step with false id', async () => {

            const result = await request(app).post('/users/workJourneyStep').send({
                idPessoa: 9999,
                data: [
                    {
                        day: 'monday',
                        timeCourse: 'morning'
                    },
                    {
                        day: 'monday',
                        timeCourse: 'afternoon'
                    },
                    {
                        day: 'tuesday',
                        timeCourse: 'morning'
                    },
                    {
                        day: 'wednesday',
                        timeCourse: 'afternoon'
                    },
                    {
                        day: 'saturday',
                        timeCourse: 'morning'
                    }
                ]
            }).expect(200)
            checkReturn(result)

        })

        it('working day step with invalid day', async () => {

            const result = await request(app).post('/users/workJourneyStep').send({
                idPessoa: savedUser.id,
                data: [{
                    day: 'abcdef',
                    timeCourse: 'morning'
                },
                {
                    day: 'monday',
                    timeCourse: 'afternoon'
                },
                {
                    day: 'tuesday',
                    timeCourse: 'morning'
                },
                {
                    day: 'wednesday',
                    timeCourse: 'afternoon'
                },
                {
                    day: 'saturday',
                    timeCourse: 'morning'
                }]
            }).expect(200)
            checkReturn(result)

        })

        it('working day step with invalid timeCourse', async () => {

            const result = await request(app).post('/users/workJourneyStep').send({
                idPessoa: savedUser.id,
                data: [{
                    day: 'monday',
                    timeCourse: 'abcdef'
                },
                {
                    day: 'monday',
                    timeCourse: 'afternoon'
                },
                {
                    day: 'tuesday',
                    timeCourse: 'morning'
                },
                {
                    day: 'wednesday',
                    timeCourse: 'afternoon'
                },
                {
                    day: 'saturday',
                    timeCourse: 'morning'
                }]
            }).expect(200)
            checkReturn(result)

        })

    })

    describe('should not save financial step', () => {

        it('financial step with invalid id', async () => {

            const result = await request(app).post('/users/financialStep').send({
                idPessoa: 9999,
                tipoConta: 'corrente',
                idBanco: 1,
                agencia: 'testeAgencia',
                conta: 'testeConta',
                pix: '',
                razaoSocial: 'testeRazaoSocial',
                cnpj: 'testeCNPJ',
                nomeFantasia: 'testeNomeFantasia'
            }).expect(200)
            checkReturn(result)

        })

        it('financial step without agencia', async () => {

            const result = await request(app).post('/users/financialStep').send({
                idPessoa: savedUser.id,
                tipoConta: 'corrente',
                idBanco: 1,
                conta: 'testeConta',
                pix: '',
                razaoSocial: 'testeRazaoSocial',
                cnpj: 'testeCNPJ',
                nomeFantasia: 'testeNomeFantasia'
            }).expect(200)
            checkReturn(result)

        })

        it('financial step without conta', async () => {

            const result = await request(app).post('/users/financialStep').send({
                idPessoa: savedUser.id,
                tipoConta: 'corrente',
                idBanco: 1,
                agencia: 'testeAgencia',
                pix: '',
                razaoSocial: 'testeRazaoSocial',
                cnpj: 'testeCNPJ',
                nomeFantasia: 'testeNomeFantasia'
            }).expect(200)
            checkReturn(result)

        })

    })

    describe('should not save theme step', () => {

        it('save theme without valid id', async () => {

            const result = await request(app).post('/users/saveThemeStep').send({
                idPessoa: 99999,
                themes: [1, 2, 3],
                shirtSize: 'P'
            }).expect(200)
            checkReturn(result)

        })

        it('save theme without valid theme', async () => {

            const result = await request(app).post('/users/saveThemeStep').send({
                idPessoa: savedUser.id,
                themes: [1, 2, 3, 7],
                shirtSize: 'P'
            }).expect(200)
            checkReturn(result)

        })

        it('save theme without valid shirt size', async () => {

            const result = await request(app).post('/users/saveThemeStep').send({
                idPessoa: savedUser.id,
                themes: [1, 2, 3],
                shirtSize: '2983756'
            }).expect(200)
            checkReturn(result)

        })

    })

})
