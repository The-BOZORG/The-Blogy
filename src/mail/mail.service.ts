import path from 'node:path';
import ejs from 'ejs';
import nodemailer, { Transporter } from 'nodemailer';

import { config } from '@/configs';

export class EmailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.MAIL_HOST,
      port: 2525,
      secure: false,
      auth: {
        user: config.SMTP_USERNAME,
        pass: config.SMTP_PASSWORD,
      },
    });
  }

  public async sendOtpEmail(email: string, code: string): Promise<void> {
    const template = path.join(__dirname, '../shared/template.ejs');

    const html = await ejs.renderFile(template, {
      code,
    });

    await this.transporter.sendMail({
      from: 'no-reply@blog.local',
      to: email,
      subject: 'Verify your account',
      html,
    });
  }
}

export const emailService = new EmailService();
