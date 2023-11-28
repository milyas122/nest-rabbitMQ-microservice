import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { RmqService } from '@app/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  app.use(cookieParser());

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('BILLING'));
  await app.startAllMicroservices();
}
bootstrap();
