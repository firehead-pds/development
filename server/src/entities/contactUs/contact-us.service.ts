//pegar as informações do formulário e chamar o email.service

import { Injectable } from "@nestjs/common";
import { EmailService } from "../../common/email/email.service";
import * as path from "node:path";
import { readFileSync } from "fs";
import handlebars from "handlebars";

@Injectable()
export class ContactUsService {
  constructor(private readonly emailService: EmailService) {
  }

  async sendContactEmail(userEmail: string, title: string, message: string): Promise<void> {
    const templatePath = path.join(__dirname, "resources", "email-template.handlebars");
    const source = readFileSync(templatePath, "utf-8").toString();
    const  template = handlebars.compile(source);
    const html = template({ title, message });

    await this.emailService.sendEmail(userEmail, title, html);
  }
}
