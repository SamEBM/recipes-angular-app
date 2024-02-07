import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; // The login response contains this property, sign up does not
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // With a BehaviorSubject we don't need to subscribe to it to get notified but we can also get the last emitted value
    currentUser = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any; 

    constructor(private http: HttpClient, private router: Router){}
    
    autoLogin(){
        const user: {email: string, id: string, _token: string, _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userData'));
        if (!user) {
            return;
        }

        const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
        
        if (loadedUser.token) {
            this.currentUser.next(loadedUser);
            const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrVfVQB1dfnjkfIDhIQ-7yS82hjgQim4M', 
            { email, password, returnSecureToken: true }
        ).pipe(catchError((errorResponse) => {
            console.log(errorResponse);
            
            let errorMessage = 'An unknown error occurred.';
            if (!errorResponse.error || !errorResponse.error.error) {
                return throwError(() => new Error(errorMessage))
            }
            switch (errorResponse.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email already exists.';
                    break;
                
                default:
                    break;
                }

            return throwError(() => new Error(errorMessage))
        }), tap(responseData => {
            const expirationData = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
            const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationData);
            this.currentUser.next(user);
            localStorage.setItem('userData', JSON.stringify(user));
        }));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrVfVQB1dfnjkfIDhIQ-7yS82hjgQim4M', 
            { email, password, returnSecureToken: true }
        ).pipe(catchError((errorResponse) => {
            console.log(errorResponse);
            
            let errorMessage = 'An unknown error occurred';
            if (!errorResponse.error || !errorResponse.error.error) {
                return throwError(() => new Error(errorMessage))
            }
            switch (errorResponse.error.error.message) {
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email does not exist.';
                    break;

                case 'INVALID_PASSWORD':
                    errorMessage = 'The login credentials are incorrect, please try again.';
                    break;
                
                case 'INVALID_LOGIN_CREDENTIALS':
                    errorMessage = 'The login credentials are incorrect, please try again.';
                    break;

                case 'USER_DISABLED':
                    errorMessage = 'The user account has been disabled by an administrator.';
                    break;

                default:
                    break;
                }

            return throwError(() => new Error(errorMessage))
        }), tap(responseData => {
            const expirationData = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
            const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationData);
            this.currentUser.next(user);
            this.autoLogout(+responseData.expiresIn * 1000);
            localStorage.setItem('userData', JSON.stringify(user));
        }));
    }

    logout(){
        this.currentUser.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }
}