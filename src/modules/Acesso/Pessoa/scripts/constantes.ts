import { Email } from '../../../../interfaces/Email'
import config from '../../../../config/api.config.json'

const domain = config.homolog ? 'localhost:3333' : '187.191.120.199:5055'

export const generateEmail = (uuid: string, to: string): Email => ({
    from: 'Hive1 <noreply@hive1.com.br>',
    to,
    subject: 'Confirme o seu e-mail',
    html: `

        <h2>Olá Hiver,</h2>

        <p>Obrigado por se cadastrar no app Hive1</p>

        <p>Nós precisamos de algumas informações para completar seu cadastro, incluindo uma confirmação de seu endereço de e-mail.</p>

        <p>Clique no link abaixo para confirmar seu endereço de e-mail:</p>

        <a href="http://${domain}/users/validarEmail/${uuid}" > Confirmar email </a>

        <p>Se você não conseguir clicar no link, copie e cole o endereço URL no seu navegador.</p>

        <p>Atenciosamente, equipe Hive1 😁</p>
        
    `,
})
