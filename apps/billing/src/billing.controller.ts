import { Controller, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@app/common';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('order_created')
  @UseGuards(JwtAuthGuard)
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(data);
    this.billingService.bill(data);
    this.rmqService.ack(context);
  }
}
