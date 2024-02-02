import { Component, Input } from '@angular/core';
import { Recipe } from '../../../../models/recipe.model';
import { RecipeService } from '../../../../services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input('recipe') recipe: Recipe;
  @Input() index: number;

  constructor(private recipeService: RecipeService){

  }
}
