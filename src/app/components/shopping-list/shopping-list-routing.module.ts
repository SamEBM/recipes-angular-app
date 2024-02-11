import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { authGuard } from "../../guards/auth.guard";
import { ShoppingListComponent } from "./shopping-list.component";

const shoppingListRoutes: Routes = [
    { path: '', component: ShoppingListComponent, canActivate: [authGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(shoppingListRoutes)
    ], 
    exports: [RouterModule]
})
export class ShoppingListRoutingModule {

}