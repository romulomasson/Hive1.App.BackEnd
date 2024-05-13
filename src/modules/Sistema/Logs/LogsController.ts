import { Request, Response } from 'express'
import { readdirSync, readFileSync } from 'fs'

export class LogController {

    all(req: Request, res: Response) {

        const logType = req.params.log === 'reqres' ? 'request-response' : 'uncaughtErrors'

        const logsFiles = (readdirSync(`./logs/${logType}`).filter(file => file.includes('log')).map(file => {

            const startDate = 5
            const endDate = 10
            const mes = 0
            const ano = 2
            const onlyDateBR = file.substring(startDate, endDate)
            const onlyDateUSA = onlyDateBR.split('-')
            const date = `${onlyDateUSA[1]}-${onlyDateUSA[mes]}-${onlyDateUSA[ano]}`

            return {
                fileName: file,
                timestamp: new Date(date).getTime()
            }

        })).sort((a, b) => a.timestamp - b.timestamp)

        const logs = logsFiles.map(file => `\n<h2 style="margin:0;">-------${file.fileName}-------</h2><br>${readFileSync(`logs/${logType}/${file.fileName}`, 'utf8').split('</br>').reverse().join('</br>')}<br>`).reverse().join('<br>')

        const html = `
            <html style="width:100%;height:auto;margin:0;">

                <head>
                    <title>Logs</title>
                </head>

                <body style="width:100vw;height:vh;margin:0;">

                    <p style="width:100%;height:auto;" >${logs}</p>

                </body>

            </html>
        `

        res.send(html)

        return { dontSend: 'do not res.send' }

    }

}
