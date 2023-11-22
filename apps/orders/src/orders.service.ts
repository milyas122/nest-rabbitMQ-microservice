import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrdersRepository) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.create(createOrderDto);
  }

  async getOrders() {
    return await this.orderRepository.getAll();
  }
}
