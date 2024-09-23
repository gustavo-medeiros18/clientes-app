import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  /**
   * Intercepts an outgoing HTTP request, adds an Authorization header if
   * an access token is present, and forwards the modified request to the
   * next handler in the chain.
   *
   * @param request The outgoing HTTP request.
   * @param next The next handler in the chain.
   * @returns An Observable of the HTTP event.
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const tokenString = localStorage.getItem('access_token');
    const url = request.url;

    if (tokenString && !url.includes('oauth/token')) {
      const token = JSON.parse(tokenString);
      const jwt = `Bearer ${token.access_token}`;

      /**
       * Clones the HTTP request and sets the Authorization header with the JWT token.
       *
       * @param update An object containing the headers to be set.
       * @returns A cloned HTTP request with the updated headers.
       */
      request = request.clone({
        setHeaders: {
          Authorization: jwt,
        },
      });
    }

    /**
     * Forwards the HTTP request to the next handler in the chain.
     *
     * @param request The outgoing HTTP request.
     * @returns An Observable of the HTTP event.
     */
    return next.handle(request);
  }
}
