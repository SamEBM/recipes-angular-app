import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject, exhaustMap, map, take, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Flautas', 
  //     'Delicious flautas with guacamole.', 
  //     'https://images.unsplash.com/photo-1670213545271-2eb6e752bf3c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     [
  //       new Ingredient('Chiles verdes', 2),
  //       new Ingredient('Tortillas', 3),
  //     ]),
  //   new Recipe(
  //     'Enfrijoladas', 
  //     "Tasty tortillas with beans.", 
  //     'https://images.unsplash.com/photo-1646678259179-b0c6d5b421a5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     [
  //       new Ingredient('Frijoles', 5),
  //       new Ingredient('Tortillas', 3),
  //     ])
  // ];

  constructor(private shoppingListService: ShoppingListService, private http: HttpClient, private authService: AuthService) { 

  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  // Firebase Backend
  storeRecipes(){
    this.http.put('https://recipes-angular-app-f8cf1-default-rtdb.firebaseio.com/recipes.json', this.recipes).subscribe(
      (response) => {
        console.log(response);
        
      }
    );
  }

  fetchRecipes(){
    // I only need to take the latest user and then unsubscribe with "take(1)"
    return this.http.get<Recipe[]>('https://recipes-angular-app-f8cf1-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          // Adding an ingredients[] empty array if a recipe does not contain any ingredients
          return recipes.map(recipe => {
            return {
              ...recipe, 
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          console.log(recipes);
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
        })
    );
  }
}
