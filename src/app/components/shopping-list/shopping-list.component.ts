import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientsSub: Subscription;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService){
    this.ingredientsSub = this.shoppingListService.ingredientsChanged.subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    this.loggingService.printLog('Second message from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy() {
    this.ingredientsSub.unsubscribe();
  }
}
