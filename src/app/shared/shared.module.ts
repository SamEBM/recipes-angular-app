import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingComponent } from "./loading/loading.component";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingComponent,
        DropdownDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        AlertComponent,
        LoadingComponent,
        DropdownDirective,
        CommonModule 
        // Dado que "BrowserModule" sólo se puede usar en un solo módulo, en cualquier otro se reemplaza con este CommonModule
        // Incluye las directivas ngFor y ngIf. En lugar de importarlo, si alguien importa el "SharedModule"
        // automáticamente puede usarlo
    ],
})
export class SharedModule {

}