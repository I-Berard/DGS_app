import { Injectable, ExecutionContext, CanActivate, ForbiddenException} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if(!user) throw new ForbiddenException("No user found in request");
        if(user.role != "Admin") throw new ForbiddenException('You do not have permission to access this resource');    
        return true;
    }
}