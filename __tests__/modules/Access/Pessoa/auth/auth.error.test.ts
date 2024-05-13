import request from 'supertest'
import connection from '../../../../../src/connection'
import app from '../../../../../src/app'
import { standardReturn } from '../../../../constants/standardReturn'
import { faker } from '@faker-js/faker'
import { generatePessoa } from '../factory'
import { getManager } from 'typeorm'

faker.setLocale('pt_BR')

describe('validation routes errors', () => {

    let savedUser: any

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

    it('login without email', async () => {

        const result = await request(app).post('/users/login').send({
            password: '123456',
        }).expect(200)

        checkReturn(result)

    })

    it('login without password', async () => {

        const result = await request(app).post('/users/login').send({
            email: savedUser.email,
        }).expect(200)

        checkReturn(result)

    })

    it('login with invalid credentials', async () => {

        const result = await request(app).post('/users/login').send({
            email: savedUser.email,
            password: 'BAD_PASSWORD',
        }).expect(200)

        checkReturn(result)

    })

    it('login without token social', async () => {

        const result = await request(app).post('/users/loginSocial').send({}).expect(200)
        checkReturn(result)

    })

    it('login with invalid token social', async () => {

        const result = await request(app).post('/users/loginSocial').send({
            token: 'BAD_TOKEN',
        }).expect(200)
        checkReturn(result)

    })

    it('validate email with invalid user uuid', async () => {

        const result = await request(app).get('/users/validarEmail/invalid_uuid').expect(200)
        checkReturn(result)

    })

    it('validate email with invalid user uuid', async () => {

        const result = await request(app).get('/users/validarEmail/ec2e7443-2813-4a20-b98f-b1407d85173e').expect(200)
        checkReturn(result)

    })

    it('validate sms with invalid user id', async () => {

        const result = await request(app).post('/users/smsVerificado').send({ idPessoa: 9999 }).expect(200)
        checkReturn(result)

    })

})

