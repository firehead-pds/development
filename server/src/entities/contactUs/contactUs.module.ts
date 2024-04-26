// reune tudo

import { Module } from '@nestjs/common';
import { ContactUsService } from './contactUs.service';
import { ContactUsController } from './contactUs.controller';
import { EmailModule } from '../email/email.module';

@Module({
    imports: [EmailModule],
  controllers: [ContactUsController],
  providers: [ContactUsService],
})
export class ContactUsModule {}
