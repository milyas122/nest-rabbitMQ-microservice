import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  async bill(data: any) {
    console.log(data);
    this.logger.log('billing...', data);
  }
}
