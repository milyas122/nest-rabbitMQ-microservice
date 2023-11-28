import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser());

  const rmpService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmpService.getOptions('AUTH', true));

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
