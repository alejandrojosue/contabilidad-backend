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
      subject: 'Confirma tu cuenta - Bienvenido a nuestra plataforma',
      html: `
        <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; text-align: center; color: #333;">
          <h2 style="color: #2c3e50;">¡Hola ${username}!</h2>
          <p style="font-size: 16px;">Gracias por registrarte en nuestra plataforma. Para activar tu cuenta, simplemente haz clic en el botón de abajo:</p>
          <a href="${confirmacionUrl}" 
            style="display: inline-block; padding: 12px 20px; margin-top: 10px; background-color: #5dade2; color: white; 
                   text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px;">
            Confirmar cuenta
          </a>
          <p style="font-size: 14px; margin-top: 20px;">Si no solicitaste esta cuenta, puedes ignorar este mensaje.</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #7f8c8d;">Si tienes problemas con el botón, copia y pega este enlace en tu navegador:</p>
          <p style="font-size: 12px; word-break: break-all;">${confirmacionUrl}</p>
        </div>
      `
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
