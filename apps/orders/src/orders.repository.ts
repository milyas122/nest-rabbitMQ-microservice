import { Injectable, Logger } from '@nestjs/common';
import { dbConstants } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { Order } from './schema/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersRepository {
  private readonly logger = new Logger(dbConstants.orderTable);

  constructor(
    @InjectModel(dbConstants.orderTable)
    private readonly orderModel: Model<Order>,
    @InjectConnection() connection: Connection,
  ) {}
  async create(data: CreateOrderDto) {
    return await this.orderModel.create({ _id: new Types.ObjectId(), ...data });
  }

  async getAll() {
    return await this.orderModel.find();
  }
}
