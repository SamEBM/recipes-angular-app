import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoggingService } from './services/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  constructor(private authService: AuthService, private loggingService: LoggingService){}

  ngOnInit(): void {
    this.authService.autoLogin();

    this.loggingService.printLog('First message from AppComponent ngOnInit');
  }
}
