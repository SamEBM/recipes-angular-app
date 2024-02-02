import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    collapsed: boolean = true;
    @Output() selectedOption = new EventEmitter<string>();

    onSelect(option: string){
        this.selectedOption.emit(option);
    }
}