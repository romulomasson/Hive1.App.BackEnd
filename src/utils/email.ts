import nodemailer from 'nodemailer'
import { Email } from '../interfaces/Email'
import { saveEmailLog } from './loggers/emailLogger'
import conf from '../config/api.config.json'

const sendEmail = async (email: Email): Promise<boolean> => {

    const CLIENT_ID = '1067244423245-4i0fkggiegnlnl8gr6iulpjf1os09nm0.apps.googleusercontent.com'
    const CLIENT_SECRET = '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'
    const REFRESH_TOKEN = '1//04Ed0sQxeIIaeCgYIARAAGAQSNgF-L9IrfHhaLRlOMkzf1nlYo5A6kJwVtTDOipE-q95d9RfItTQE3Id8qFySy9h9rpEpOH2zIA'
    //https://console.cloud.google.com/apis/credentials/oauthclient/1067244423245-4i0fkggiegnlnl8gr6iulpjf1os09nm0.apps.googleusercontent.com?project=hive-web-app-338302
    //https://www.youtube.com/watch?v=18qA61bpfUs&t=154s

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'noreply@hive1.com.br',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
        }
    })

    if (!conf.sendEmails) return true

    try {

        await transporter.sendMail(email)
        saveEmailLog(`Email enviado para '${email.to}'`)
        return true

    } catch (error) {

        console.log(error)
        saveEmailLog({ msg: `Erro ao enviar email para '${email.to}'`, error })
        return false

    }

}

export default sendEmail
