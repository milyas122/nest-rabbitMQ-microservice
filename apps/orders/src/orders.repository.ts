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
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(data: CreateOrderDto, session?: any) {
    const options = session ? { session } : {};
    const document = new this.orderModel({
      _id: new Types.ObjectId(),
      ...data,
    });
    return await document.save(options);
  }

  async getAll() {
    return await this.orderModel.find();
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
