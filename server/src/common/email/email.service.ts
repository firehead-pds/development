import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { promises as fs } from 'fs';
import handlebars from 'handlebars';
import { emailTemplates } from './email-templates';
import * as path from 'node:path';

@Injectable()
export class EmailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail<T extends keyof emailTemplates>(
    template: T,
    to: string,
    subject: string,
    body: emailTemplates[T],
  ): Promise<void> {
    const html = await this.renderEmailTemplate(template, body);

    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: to,
        subject: subject,
        html: html,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'there was an error connecting to the email service',
      );
    }
  }

  private async renderEmailTemplate<T extends keyof emailTemplates>(
    templateName: T,
    body: emailTemplates[T],
  ) {
    const templatePath = path.join(
      __dirname,
      'resources',
      `${templateName.toString()}-template.handlebars`,
    );

    const source = (await fs.readFile(templatePath, 'utf-8')).toString();
    const template = handlebars.compile(source);
    return template({ ...body });
  }
}
