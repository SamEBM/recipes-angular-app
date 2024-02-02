import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Flautas', 
      'Delicious flautas with guacamole.', 
      'https://images.unsplash.com/photo-1670213545271-2eb6e752bf3c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      [
        new Ingredient('Chiles verdes', 2),
        new Ingredient('Tortillas', 3),
      ]),
    new Recipe(
      'Enfrijoladas', 
      "Tasty tortillas with beans.", 
      'https://images.unsplash.com/photo-1646678259179-b0c6d5b421a5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      [
        new Ingredient('Frijoles', 5),
        new Ingredient('Tortillas', 3),
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { 

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
}
