import request from 'supertest'
import connection from '../../../../../src/connection'
import app from '../../../../../src/app'
import { standardReturn } from '../../../../constants/standardReturn'
import { personalInfoFields, signUpFields } from '../constant/registerReturn'
import { faker } from '@faker-js/faker'

faker.setLocale('pt_BR')

describe('user register propertly', () => {

    let savedUserId: number

    beforeAll(async () => {

        await connection.test_create()

    })

    afterAll(async () => {

        await connection.clear('DELETE')
        await connection.close()

    })

    const checkReturn = (response: any, fields: string[]) => {

        expect(Object.keys(response.body)).toStrictEqual(standardReturn)
        expect(response.body.listaMensagens[0]).toBe(undefined)
        expect(Object.keys(response.body.listaResultados).sort()).toStrictEqual(fields.sort())
        expect(response.body.flagErro).toBe(false)

    }

    it('should do signUp without token', async () => {

        const result = await request(app).post('/users/signupStep').send({
            email: 'marcosaquiuqui@gmail.com',
            name: faker.name.firstName(),
            password: faker.internet.password(),
        }).expect(200)
        checkReturn(result, signUpFields)

        savedUserId = result.body.listaResultados.id

    })

    it('should do signUp with token', async () => {

        const result = await request(app).post('/users/signupStep').send({
            email: 'luisgustavofeitoza3@gmail.com',
            name: faker.name.firstName(),
            password: faker.internet.password(),
            token: faker.internet.password(),
        }).expect(200)
        checkReturn(result, signUpFields)

        savedUserId = result.body.listaResultados.id

    })

    it('should do basic info step', async () => {

        const result = await request(app).post('/users/personalInfoStep').send({
            id: savedUserId,
            CEP: faker.address.zipCode(),
            CPF: '50576013854',
            address: faker.address.streetName(),
            avatar: faker.internet.url(),
            birthDay: faker.date.past(),
            cellphone: faker.phone.phoneNumber(),
            city: faker.address.cityName(),
            complement: faker.address.secondaryAddress(),
            genre: faker.random.arrayElement(['M', 'F']),
            name: faker.name.findName(),
            nickname: faker.internet.userName(),
            number: faker.datatype.number().toString(),
            state: faker.address.stateAbbr(),
            telephone: faker.phone.phoneNumber()
        }).expect(200)

        checkReturn(result, personalInfoFields)

    })

    it('should do working day step', async () => {

        const result = await request(app).post('/users/workJourneyStep').send({
            idPessoa: savedUserId,
            data: [{
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
            }]
        }).expect(200)

        checkReturn(result, personalInfoFields)

    })

    it('should do financial step', async () => {

        const result = await request(app).post('/users/financialStep').send({
            idPessoa: savedUserId,
            tipoConta: 'corrente',
            idBanco: 1,
            agencia: faker.finance.routingNumber(),
            conta: faker.finance.account(),
            pix: '',
            razaoSocial: faker.company.companyName(),
            cnpj: '26.976.619/0001-20',
            nomeFantasia: faker.company.companyName()
        }).expect(200)

        checkReturn(result, [...personalInfoFields, 'conta'])

    })

    it('should do theme step', async () => {

        const result = await request(app).post('/users/saveThemeStep').send({
            idPessoa: savedUserId,
            themes: [1, 2, 3],
            shirtSize: faker.random.arrayElement(['P', 'M', 'G', 'GG'])
        }).expect(200)

        checkReturn(result, [...personalInfoFields, 'conta'])

    })

})
