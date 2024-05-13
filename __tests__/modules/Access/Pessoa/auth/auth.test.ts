import request from 'supertest'
import connection from '../../../../../src/connection'
import app from '../../../../../src/app'
import { standardReturn } from '../../../../constants/standardReturn'
import { faker } from '@faker-js/faker'
import { generatePessoa } from '../factory'
import { getManager } from 'typeorm'

faker.setLocale('pt_BR')

describe('validation routes propertly', () => {

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
        expect(response.body.listaMensagens[0]).toBe(undefined)
        expect(response.body.flagErro).toBe(false)

    }

    it('login with email and password', async () => {

        const result = await request(app).post('/users/login').send({
            email: savedUser.email,
            password: '123456',
        }).expect(200)

        checkReturn(result)

    })

    it('login with token social', async () => {

        const result = await request(app).post('/users/loginSocial').send({
            token: 'A'
        }).expect(200)

        checkReturn(result)

    })

    it('validate email', async () => {

        const result = await request(app).get(`/users/validarEmail/${savedUser.uuid}`).expect(200)
        expect(result.text).toBe('<h1>Email validado</h1>')

    })

    it('validate sms', async () => {

        const result = await request(app).post('/users/smsVerificado').send({ idPessoa: savedUser.id }).expect(200)
        checkReturn(result)

    })

})

