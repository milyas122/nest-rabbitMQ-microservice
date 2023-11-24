import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from './constants/service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.create(createOrderDto);
    console.log('Create Order calling...');

    // convert an observable to a promise
    await lastValueFrom(
      this.billingClient.emit('order_created', { createOrderDto }),
    );

    return order;
  }

  async getOrders() {
    return await this.orderRepository.getAll();
  }
}
