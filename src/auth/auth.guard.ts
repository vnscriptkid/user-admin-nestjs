import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    try {
      const jwt = request.cookies['jwt'];

      return !!this.jwtService.verify(jwt);
    } catch (err) {
      return false;
    }
  }
}
