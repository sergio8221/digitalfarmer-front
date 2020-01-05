import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../auth/auth.service";

/**
 * Intercept outgoing HTTP requests, clone them and add token to headers before sending them
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    /**
     * Treats requests intercepted
     * @param request Http requests intercepted
     * @param next Next node in request handling chain
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add authorization header with jwt token if available
        let currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    // No need to add 'Bearer' because token is already saved with it
                    Authorization: currentUser.token
                }
            });
        }

        return next.handle(request);
    }
}