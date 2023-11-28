import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../schema/users.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
