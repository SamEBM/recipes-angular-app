import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../models/recipe.model";
import { RecipeService } from "./recipe.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private recipesService: RecipeService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipesService.getRecipes();

        if (recipes.length === 0) {
            return this.recipesService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}