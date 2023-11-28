import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    console.log(req.user);
    return this.ordersService.createOrder(
      createOrderDto,
      req.cookies?.Authentication,
    );
  }

  @Get()
  async listOrders() {
    return this.ordersService.getOrders();
  }
}
