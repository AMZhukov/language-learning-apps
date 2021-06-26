// eslint-disable-line
import nodemailer from 'nodemailer';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: `${process.env.SMTP_PASSWORD}`,
      },
    });
  }

  async sendActivationMail(email, activationLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Активация аккаунта на ${process.env.NAME_APP}`,
      text: '',
      html: `  
        <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href='${activationLink}'>${activationLink}</a>
        </div>
      `,
    });
  }
}

export const mailService = new MailService();
