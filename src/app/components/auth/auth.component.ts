import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router){}

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = "";

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    const {email, password} = form.value;

    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password)
    } else{
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe({
      next: (data) => {
        console.log(data);
        this.isLoading = false;
        form.reset();
        this.router.navigate(['/recipes']);
      }, 
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      },
    });
  }
}
