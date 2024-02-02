import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedOption: string = 'recipe';

  onNavigate(option: string){
    this.selectedOption = option;
  }
}
