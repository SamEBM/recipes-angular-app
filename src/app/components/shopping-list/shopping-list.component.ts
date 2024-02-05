import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientsSub: Subscription;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService){
    this.ingredientsSub = this.shoppingListService.ingredientsChanged.subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnDestroy() {
    this.ingredientsSub.unsubscribe();
  }
}
