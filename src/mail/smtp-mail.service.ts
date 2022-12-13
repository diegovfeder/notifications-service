import { Injectable } from '@nestjs/common';

import { MailService } from './mail.service';

@Injectable()
export class SMTPMailService implements MailService {
  sendEmail() {
    // Send email using SMTP
    return 'SMTP Mail!';
  }
}
