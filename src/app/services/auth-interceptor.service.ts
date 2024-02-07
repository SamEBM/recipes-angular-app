import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.currentUser.pipe(
            take(1), 
            // Regresar el siguiente observable dentro de este observable
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }

                const modifiedRequest = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
        
                console.log('Request intercepted and updated: ', modifiedRequest);
        
                return next.handle(modifiedRequest);
            })
        );
    }
}