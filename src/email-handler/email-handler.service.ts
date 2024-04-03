import { BadRequestException, Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailHandlerService {
  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }
  async sendEmail(mail: SendGrid.MailDataRequired) {
    console.log(mail);
    try {
      const transport = await SendGrid.send(mail);

      console.log(transport);

      return transport;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
