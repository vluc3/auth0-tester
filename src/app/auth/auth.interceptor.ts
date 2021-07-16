import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken: string = localStorage.getItem('auth0.idToken');

    if (idToken) {
      const authorizationRequest: HttpRequest<any> = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${idToken}`)
      });

      return next.handle(authorizationRequest);
    } else {
      return next.handle(request);
    }
  }
}
