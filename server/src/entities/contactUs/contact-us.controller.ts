import { Body, Controller, Post } from "@nestjs/common";
import { ContactUsService } from "./contact-us.service";
import SendMessageDto from "./dtos/send-message.dto";
import { ApiCreatedResponse } from "@nestjs/swagger";

@Controller("contact-us")
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {
  }

  @ApiCreatedResponse({ description: "message sent successfully" })
  @Post()
  async sendEmail(@Body() emailData: SendMessageDto) {
    const { userEmail, title, message } = emailData;
    await this.contactUsService.sendContactEmail(userEmail, title, message);
    return "message sent successfully";
  }
}
