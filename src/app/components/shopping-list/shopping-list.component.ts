import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService){
    this.shoppingListService.ingredientsChanged.subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }
}
