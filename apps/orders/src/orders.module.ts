import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { OrdersRepository } from './orders.repository';
import {
  AuthModule,
  DatabaseModule,
  RmqModule,
  dbConstants,
} from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schema/order.schema';
import { BILLING_SERVICE } from './constants/service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: dbConstants.orderTable, schema: OrderSchema },
    ]),
    RmqModule.register({
      name: BILLING_SERVICE,
    }),
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
