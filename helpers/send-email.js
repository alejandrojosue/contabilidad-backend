import { EMAIL_PASS, EMAIL_USER, FRONTEND_URL } from '../config/admin.js'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
})

export const sendConfirmationEmail = async (username, email, token) => {
  try {
    const confirmacionUrl = `${FRONTEND_URL}/confirm/${token}`

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Confirma tu cuenta',
      text: `Hola ${username}, haz clic en el siguiente enlace para confirmar tu cuenta:`,
      html: `<div><p>Hola ${username}, haz clic en el siguiente enlace para confirmar tu cuenta:</p><br><a style="padding: 15px; position: absolute; left: 50%; top: 0; transform: translateX(-50%); background-color: #5dade2; color: white; text-decoration: none; border-radius: 5px;" href="${confirmacionUrl}">Confirmar</a></div>`
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error al enviar el correo de confirmación:', error.message)
  }
}

export const sendRecoveryPassEmail = async (email, token) => {
  try {
    const confirmacionUrl = `${FRONTEND_URL}/recovery/${token}`

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Recuperar tu cuenta',
      text: 'Haz clic en el siguiente enlace para confirmar tu cuenta:',
      html: `<div><p>Haz clic en el siguiente enlace para confirmar tu cuenta:</p><br><a style="padding: 15px; position: absolute; left: 50%; top: 0; transform: translateX(-50%); background-color: #5dade2; color: white; text-decoration: none; border-radius: 5px;" href="${confirmacionUrl}">Recuperar</a></div>`
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error al enviar el correo de recuperación de clave de usuario:', error.message)
  }
}
