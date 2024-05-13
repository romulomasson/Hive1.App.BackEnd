import { createConnection, getConnection } from 'typeorm'
import { Tables } from './entities'

const connection = {
    async create() {

        await createConnection({
            type: 'postgres',
            port: <number><unknown>process.env.DB_PORT,
            host: <string>process.env.DB_HOST,
            username: <string>process.env.DB_USER,
            password: <string>process.env.DB_PASSWORD,
            database: <string>process.env.DB_NAME,
            synchronize: false,
            entities: [...Tables],
            migrations: [`${__dirname }/migrations/*.ts`],
            cli: { 'migrationsDir': 'migration/' },
            cache: { duration: 30000 },
        })

    },

    async test_create() {

        return await createConnection({
            type: 'postgres',
            port: <number><unknown>process.env.DB_PORT,
            host: <string>process.env.DB_HOST,
            username: <string>process.env.DB_USER,
            password: <string>process.env.DB_PASSWORD,
            database: 'hive1_tests',
            synchronize: false,
            entities: [...Tables],
            migrations: [`${__dirname }/migrations/*.ts`],
            cli: { 'migrationsDir': 'migration/' },
            cache: { duration: 30000 },
        })

    },

    async close() {

        await getConnection().close()

    },

    async clear(password: string) {

        if (password === 'DELETE'){

            const connection = getConnection()
            const entities = connection.entityMetadatas

            for (const entity of entities) {

                const repository = connection.getRepository(entity.name)
                const schemaPrefix = entity.schema ? `${entity.schema}.` : ''
                await repository.query(
                    `TRUNCATE ${schemaPrefix}${entity.tableName} RESTART IDENTITY CASCADE`
                )

            }

        }

    },
}
export default connection
