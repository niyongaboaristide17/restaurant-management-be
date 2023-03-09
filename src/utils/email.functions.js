import 'dotenv/config'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const send_mail = (message) => {
    sgMail
        .send({ ...message, from: process.env.SENDGRID_DEFAULT_SENDER })
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch(error => {
            console.error(error)
        })
}

export default send_mail