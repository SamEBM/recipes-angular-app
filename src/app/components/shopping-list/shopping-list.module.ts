import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { SharedModule } from "../../shared/shared.module";
import { LoggingService } from "../../services/logging.service";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    // Importar lo que está disponible en otros módulos
    imports: [
        ShoppingListRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        LoggingService // Esta es una instancia diferente del servicio, por eso no puede encontrar el primer mensaje y da "undefined" despues del segundo mensaje
    ]
})
export class ShoppingListModule {

}