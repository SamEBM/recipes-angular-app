import { Component } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService){
    this.recipeService.recipeSelected.subscribe(recipe => {
      this.selectedRecipe = recipe;
    });
  }
}
