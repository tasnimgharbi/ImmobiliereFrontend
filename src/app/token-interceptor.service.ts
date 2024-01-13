import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from './auth.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>>
  {
    let authService = this.injector.get(AuthService)
    let tokanizedReq = req.clone({
      setHeaders: {
        Autherization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokanizedReq)
  }
}
