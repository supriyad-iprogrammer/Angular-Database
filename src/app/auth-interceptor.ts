import { HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptor implements HttpInterceptor{
  intercept(req:HttpRequest<any>, next:
    HttpHandler){

return next.handle(req)
console.log("auth interceptor");
  }
}
