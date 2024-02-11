import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesResolverService } from "../../services/recipes-resolver.service";
import { authGuard } from "../../guards/auth.guard";

const recipesRoutes: Routes = [
    { 
        path: '', component: RecipesComponent, 
        children: [
            { path: '', component: RecipeStartComponent},
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
        ], 
        canActivate: [authGuard]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(recipesRoutes)
    ], 
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}