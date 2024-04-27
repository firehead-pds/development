import { Injectable } from '@nestjs/common';
import { EmailService } from '../../common/email/email.service';

@Injectable()
export class ContactUsService {
  constructor(private readonly emailService: EmailService) {}

  async sendContactEmail(userEmail: string, title: string, message: string) {
    const emailBody = { title, message };
    await this.emailService.sendEmail(
      'contact-us',
      userEmail,
      title,
      emailBody,
    );
  }
}
