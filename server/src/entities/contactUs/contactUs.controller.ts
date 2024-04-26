import { Controller, Post, Body } from '@nestjs/common';
import { ContactUsService } from './contactUs.service';

@Controller('contactUs')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  async sendEmail(
    @Body() emailData: { userEmail: string, title: string, message: string }
  ): Promise<string> {
    const { userEmail, title, message } = emailData;
    await this.contactUsService.sendContactEmail(userEmail, title, message);
    return 'Email enviado com sucesso';
  }
}
