import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLE_KEY } from "./role-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
    ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLE_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
      if(!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader: string = req.headers.authorization;
      console.log(authHeader);
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if(bearer !== 'Bearer' || !token) {
        throw new HttpException('User doesn`t have needed role', HttpStatus.FORBIDDEN);
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some(role => requiredRoles.includes(role.value));
    } catch (err) {
      console.log(err);
      throw new HttpException('User doesn`t have needed role', HttpStatus.FORBIDDEN);
    }
  }
  
}