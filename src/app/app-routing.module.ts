import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./components/recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./components/recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./components/recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./services/recipes-resolver.service";
import { AuthComponent } from "./components/auth/auth.component";
import { authGuard } from "./guards/auth.guard";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent},
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
    ], canActivate: [authGuard]},
    { path: 'shopping-list', component: ShoppingListComponent, canActivate: [authGuard] },
    { path: 'auth', component: AuthComponent },
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/recipes' }
];

@NgModule({
    imports: [
        // Si el web server que hostee esta aplicacion no permite definir una pagina en caso de 404, se debe usar el hash '#' en las rutas 
        // RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes)
    ], 
    exports: [RouterModule]
})
export class AppRoutingModule {

}