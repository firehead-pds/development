import { Body, Controller, Post } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import SendMessageDto from './dtos/send-message.dto';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { Public } from '../../auth/decorators/is-public.decorator';

@Public()
@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @ApiCreatedResponse({ description: 'message sent successfully' })
  @ApiInternalServerErrorResponse({
    description:
      'most likely an error connecting to the external email service',
  })
  @Post()
  async sendEmail(@Body() emailData: SendMessageDto) {
    const { userEmail, title, message } = emailData;
    await this.contactUsService.sendContactEmail(userEmail, title, message);
    return { message: 'message sent successfully' };
  }
}
