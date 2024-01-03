import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { getRoutingCurrent } from '../utils/functions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authenticationService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getAuthorization();
    const routeSplit = getRoutingCurrent(this.router.url.split('/'));
    const origin = routeSplit ? routeSplit : '';

    if (token) {
      if (request.headers.has('X-Skip-Interceptor')) {
        const headers = request.headers.delete('X-Skip-Interceptor');
        return next.handle(request.clone({ headers }));
      } else {
        request = request.clone({
          headers: new HttpHeaders({
            ContentType: 'application/json;',
            Authorization: `Bearer ${token}`,
            Routepath: origin,
          }),
        });
      }
    } else {
      request = request.clone({
        headers: new HttpHeaders({
          ContentType: 'application/json',
          Routepath: origin,
        }),
      });
    }
    return next.handle(request);
  }
}
