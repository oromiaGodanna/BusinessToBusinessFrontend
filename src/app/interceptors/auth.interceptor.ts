
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var token = this.authService.getToken();

        if (token) {
            const copiedReq = req.clone({ headers: req.headers.set('token', token) });
            return next.handle(copiedReq);
        }else{
            return next.handle(req);
        }

    }
}