import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersRepository, UserService],
  exports: [UserService],
})
export class UsersModule {}
