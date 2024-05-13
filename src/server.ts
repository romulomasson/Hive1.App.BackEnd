/* eslint-disable no-console */
import app from './app'
import connection from './connection'

const DEFAULT_PORT = 3333
const PORT = process.env.PORT || DEFAULT_PORT

async function run() {

    await connection.create()

    app.listen(PORT)
    console.log(`🔥 Express server has started on http://localhost:${PORT} 🔥`)

}

run()

