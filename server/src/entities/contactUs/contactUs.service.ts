//pegar as informações do formulário e chamar o email.service

import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class ContactUsService {
  constructor(private readonly emailService: EmailService) {}

  async sendContactEmail(userEmail: string, title: string, message: string): Promise<void> {
      await this.emailService.sendEmail(userEmail, title, message);  
  }
}
