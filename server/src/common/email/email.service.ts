import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { promises as fs } from 'fs';
import handlebars from 'handlebars';
import { emailTemplates } from './email-templates';
import * as path from 'node:path';
import { google } from 'googleapis';
import * as process from 'node:process';
import { ConfigService } from '@nestjs/config';
import { EmailConfiguration } from './email.configuration';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.initializeTransporter();
  }

  private async initializeTransporter() {
    const emailConfig =
      this.configService.getOrThrow<EmailConfiguration>('email');

    const oAuth2Client = new google.auth.OAuth2(
      emailConfig.googleOAuthClientId,
      emailConfig.googleOAuthClientSecret,
      'https://developers.google.com/oauthplayground',
    );

    oAuth2Client.setCredentials({
      refresh_token: emailConfig.googleOAuthRefreshToken,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oAuth2Client.getAccessToken((err, token) => {
        if (err) {
          reject(`Failed to create access token :( ${err}`);
        }
        resolve(token);
      });
    });

    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: emailConfig.emailUser,
        accessToken: accessToken as string,
        clientId: emailConfig.googleOAuthClientId,
        clientSecret: emailConfig.googleOAuthClientSecret,
        refreshToken: emailConfig.googleOAuthRefreshToken,
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
      console.error(err);
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
      process.cwd(),
      'resources',
      'email-templates',
      `${templateName.toString()}-template.handlebars`,
    );

    const source = (await fs.readFile(templatePath, 'utf-8')).toString();
    const template = handlebars.compile(source);
    return template({ ...body });
  }
}
