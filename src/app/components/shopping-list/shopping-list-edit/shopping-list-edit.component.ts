import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingListService } from '../../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false}) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService){
    
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) =>{
      this.editMode = true;
      this.editedItemIndex = index;

      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingListForm.setValue({
        ingredientName: this.editedItem.name,
        ingredientAmount: this.editedItem.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  onSubmit(form: NgForm){
    console.log(form);
    const formValues = form.value;
    const newIngredient: Ingredient = new Ingredient(formValues.ingredientName, formValues.ingredientAmount);
    
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
