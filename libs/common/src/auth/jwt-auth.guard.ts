import {
  CanActivate,
  Injectable,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';
import { AUTH_SERVICE } from '../constant';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      return false;
    }
    return this.authClient.send('authenticate', { Authentication: jwt }).pipe(
      tap((res) => {
        context.switchToHttp().getRequest().user = res;
      }),
      map(() => true),
    );
  }
}