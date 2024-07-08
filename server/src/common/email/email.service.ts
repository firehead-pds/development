/* import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
} */ 

  import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { promises as fs } from 'fs';
import handlebars from 'handlebars';
import { emailTemplates } from './email-templates';
import * as path from 'node:path';
import { google } from 'googleapis';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.initializeTransporter();
  }

  private async initializeTransporter() {
    //console.log(process.env.EMAIL_USER)
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI,
    );

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://mail.google.com/'],
    });
    
    
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();

    

    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
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
      throw new InternalServerErrorException(
        'There was an error connecting to the email service',
      );
    }
  }

  private async renderEmailTemplate<T extends keyof emailTemplates>(
    templateName: T,
    body: emailTemplates[T],
  ): Promise<string> {
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